import { Float3, MathX } from 'vl-shared/src/math';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';
import { IDestination, IObjective } from 'vl-shared/src/schemas/RoutesSchema';

interface MappedLocation {
  location: ILocation;
  children: Map<string, MappedLocation>;
  parent: MappedLocation;
  get position(): Float3;
}

export function binaryLocationTree(locations: ILocation[]) {
  const entities = new Map<string, MappedLocation>();
  // Initialization of Nodes
  for (const location of locations) {
    const mPoint: MappedLocation = {
      location,
      children: new Map(),
      parent: null as unknown as MappedLocation,
      get position() {
        const myLocation = new Float3(location.x, location.y, location.z);
        const parentPosition = this.parent ? this.parent.position : new Float3();
        return myLocation.add(parentPosition);
      },
    };
    entities.set(mPoint.location.id, mPoint);
  }
  // Map Hookup
  entities.forEach((value: MappedLocation, key: string) => {
    const location = value.location;
    const entityArray = Array.from(entities);
    const parent: [string, MappedLocation] | undefined = entityArray.find(([, value]) => {
      return value.location.short_name === location.parent;
    });
    if (parent != null) {
      value.parent = parent[1];
      parent[1].children.set(key, value);
    }
  });
  return entities;
}

export function createDestID() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < 32; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function objectiveToDestination(
  location: ILocation,
  objective: IObjective,
  destinations: IDestination[],
  newDestinations: IDestination[],
  updatedDestinations: IDestination[],
) {
  const existingDestination = destinations.find(
    (dest: IDestination) => dest.location.id === location.id,
  );
  const updatedDestination = updatedDestinations.find(
    (dest: IDestination) => dest.location.id === location.id,
  );
  const newExistingDestination = newDestinations.find(
    (dest: IDestination) => dest.location.id === location.id,
  );

  if (existingDestination || updatedDestination || newExistingDestination) {
    if (existingDestination) {
      const newDestination = {
        ...existingDestination,
        objectives: [...(existingDestination.objectives || []), objective],
      };
      updatedDestinations.push(newDestination);
    } else if (updatedDestination) {
      updatedDestination.objectives = [
        ...(updatedDestination.objectives || []),
        objective,
      ];
    } else if (newExistingDestination) {
      newExistingDestination.objectives = [
        ...(newExistingDestination.objectives || []),
        objective,
      ];
    }
  } else {
    const newDestination: IDestination = {
      id: createDestID(),
      stopNumber: destinations.length + 1,
      location,
      reason: 'Mission',
      objectives: [objective],
    };
    newDestinations.push(newDestination);
  }
}

export function destinationsFromObjectives(
  objectives: IObjective[],
  destinations: IDestination[],
  userLocation: ILocation,
) {
  const onLocation = destinations.find(
    (dest: IDestination) => dest.location.id === userLocation.id,
  );
  const updatedDestinations: IDestination[] = [];
  const newDestinations: IDestination[] = [];

  if (!onLocation && userLocation.id != null) {
    updatedDestinations.push(
      ...destinations.map((dest) => ({
        ...dest,
        stopNumber: dest.stopNumber + 1,
      })),
    );
    const newDestination: IDestination = {
      id: createDestID(),
      stopNumber: 1,
      location: userLocation,
      reason: 'Start',
    };
    newDestinations.push(newDestination);
  }

  objectives.forEach((objective: IObjective) => {
    if (objective.status === 'COMPLETED') return;
    objectiveToDestination(
      objective.pickup,
      objective,
      destinations,
      newDestinations,
      updatedDestinations,
    );
    objectiveToDestination(
      objective.dropOff,
      objective,
      destinations,
      newDestinations,
      updatedDestinations,
    );
  });
  return { updatedDestinations, newDestinations };
}

export function floydWarshallRoute(
  destinations: IDestination[],
  locationTree: Map<string, MappedLocation>,
) {
  // Total amount of SET Stops
  const numLocations = destinations.length;

  // Matrix allowing for the sorting of distances
  const distMatrix: number[][] = Array.from({ length: numLocations }, () =>
    Array(numLocations).fill(Infinity),
  );

  // The Identification of each stop
  const next: (number | null)[][] = Array.from({ length: numLocations }, () =>
    Array(numLocations).fill(null),
  );

  // All available Location Ids to pull from the Location Tree
  const locationIds = destinations.map((dest) => dest.location.id);

  //**Algorithm Usage */
  // Initialize Distance Matrix
  for (let i = 0; i < numLocations; i++) {
    for (let j = 0; j < numLocations; j++) {
      if (i === j) {
        distMatrix[i][j] = 0;
      } else {
        const locA = locationTree.get(locationIds[i])?.position;
        const locB = locationTree.get(locationIds[j])?.position;
        if (locA && locB) {
          distMatrix[i][j] = MathX.distance(locA, locB);
          next[i][j] = j;
        }
      }
    }
  }

  // Floyd-Warshall Algo for all pairs shortest paths
  for (let k = 0; k < numLocations; k++) {
    for (let i = 0; i < numLocations; i++) {
      for (let j = 0; j < numLocations; j++) {
        if (distMatrix[i][j] > distMatrix[i][k] + distMatrix[k][j]) {
          distMatrix[i][j] = distMatrix[i][k] + distMatrix[k][j];
          next[i][j] = next[i][k];
        }
      }
    }
  }

  //** Returned Array of Ordered Destinations */
  const orderedDestinations: IDestination[] = [];

  const reconstructPath = (start: number, end: number): number[] => {
    if (next[start][end] === null) return [];
    const path: number[] = [start];
    let current = start;
    path.push(current);

    while (current !== end) {
      current = next[current][end]!;
      path.push(current);
    }
    return path;
  };

  const startLocationIndex = destinations.findIndex((dest) => dest.reason === 'Start');

  const startLocation = startLocationIndex !== -1 ? startLocationIndex : 0;
  let currentLocation = startLocation;

  const visited = new Set<number>();

  while (visited.size < numLocations) {
    visited.add(currentLocation);
    let nextLocation = -1;
    let minDistance = Infinity;

    for (let i = 0; i < numLocations; i++) {
      if (!visited.has(i) && distMatrix[currentLocation][i] < minDistance) {
        minDistance = distMatrix[currentLocation][i];
        nextLocation = i;
      }
    }

    if (nextLocation !== -1) {
      const path = reconstructPath(currentLocation, nextLocation);
      path.forEach((index) => {
        const destination = destinations[index];
        if (!orderedDestinations.includes(destination)) {
          orderedDestinations.push(destination);
        }
      });
      currentLocation = nextLocation;
    } else {
      break;
    }
  }
  console.log('Calculated Effecient Route', orderedDestinations);
  return orderedDestinations;
}
