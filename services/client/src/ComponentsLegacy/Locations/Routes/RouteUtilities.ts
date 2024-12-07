import { createLocalID } from '@Utils/createId';
import { Logger } from '@Utils/Logger';
import { Float3, MathX } from 'vl-shared/src/math';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';
import { IDestination, ITask } from 'vl-shared/src/schemas/RoutesSchema';

export interface MappedLocation {
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

export function getMappedLocation(
  locationTree: Map<string, MappedLocation>,
  locationId: string,
): MappedLocation | null {
  return locationTree.get(locationId) ?? null;
}

export function formatDistance(locA: MappedLocation, locB: MappedLocation): string {
  if (locA.parent && locA.parent.location.id === locB.location.id) return `Fluctuates`;
  if (locB.parent && locB.parent.location.id === locA.location.id) return `Exit Atmo`;
  const floatDistance = MathX.distance(locA.position, locB.position);
  const absDistance = Math.abs(floatDistance);
  if (absDistance < 1_000) {
    return `${absDistance.toFixed(2).toLocaleString()} km`;
  } else if (absDistance < 1_000_000) {
    return `${(absDistance / 1_000).toFixed(2)} Mm`;
  } else if (absDistance < 1_000_000_000) {
    return `${(absDistance / 1_000_000).toFixed(2)} Gm`;
  } else {
    return `${(absDistance / 1_000_000_000).toFixed(2).toLocaleString()} Tm`;
  }
}

export function getSiblingDestinations(task: ITask, destinations: IDestination[]) {
  return destinations.filter((dest) =>
    dest.tasks.some((t) => t.relationId === task.relationId),
  );
}

function createStartDestination(location: ILocation): IDestination {
  const newDestination = {
    id: createLocalID('D'),
    stopNumber: 1,
    location,
    visited: false,
    tasks: [] as ITask[],
  };
  return newDestination;
}

function validateDropOff(pickedUpPackages: ITask[], target: ITask): boolean {
  return Boolean(pickedUpPackages.find((task) => task.relationId === target.relationId));
}

function validateCapacity(
  maxLoad: number,
  currentLoad: number,
  availableLoads: ITask[],
): ITask[] {
  if (maxLoad === 0) return availableLoads;
  // Validate If an Objective would Exceed the MaxLoad
  const validLoads = availableLoads.filter((load) => {
    const loadValue = load.scu ?? 0;
    return currentLoad + loadValue <= maxLoad;
  });

  // Sort Loads to Prioritize More Objectives over Singular Objectives with large Loads
  validLoads.sort((a, b) => (a.scu ?? 0) - (b.scu ?? 0));

  // Pick out as many loads without exceeding Max Load
  const selectedTasks: ITask[] = [];
  let totalLoad = currentLoad;
  for (const obj of validLoads) {
    const loadValue = obj.scu ?? 0;
    if (totalLoad + loadValue <= maxLoad) {
      selectedTasks.push(obj);
      totalLoad += loadValue;
    }
  }

  return selectedTasks;
}

function checkpointValidation(
  current: ILocation,
  next: ILocation,
  nextMapped: MappedLocation,
): IDestination | undefined {
  if (current.parent !== next.parent && next.parent != null) {
    const newDestination: IDestination = {
      id: createLocalID('D'),
      stopNumber: 0,
      location: nextMapped.parent.location,
      visited: false,
      tasks: [
        {
          id: createLocalID('T'),
          type: 'checkpoint',
          location: nextMapped.parent.location,
          status: 'PENDING',
        },
      ],
    };
    return newDestination;
  }
  return undefined;
}

export function getEfficientDistancePath(
  taskArray: ITask[],
  locationTree: Map<string, MappedLocation>,
  maxLoad: number,
  existingLoad: number,
  userLocation: ILocation | null,
) {
  const foundUserLocation = Boolean(userLocation && userLocation.id);
  // *Initial Values*
  // The Constructed Path to be built from Destinations
  const constructedPath: IDestination[] = [];
  // Initialize the Current Load
  let currentLoad: number = existingLoad;
  // Initialize the Tasks
  const pickups = taskArray.filter((task) => task.type === 'pickup');
  const dropOffs = taskArray.filter((task) => task.type === 'dropoff');
  // Initialize the Start Location
  const startLocation = foundUserLocation ? userLocation : pickups[0].location;

  // Get Unique Locations
  const uniqueLocations = Array.from(new Set(taskArray.map((task) => task.location.id)));
  if (foundUserLocation && userLocation) {
    uniqueLocations.push(userLocation.id);
  }
  const totalLocations = uniqueLocations.length;

  const totalTasks = pickups.length + dropOffs.length;

  // Initialize the Distance Matrix
  const distMatrix: number[][] = Array.from({ length: totalLocations }, () =>
    Array(totalLocations).fill(Infinity),
  );

  // Initialize the Next Function
  const next: (number | null)[][] = Array.from({ length: totalLocations }, () =>
    Array(totalLocations).fill(null),
  );

  // *Distance Matrix Initalization*
  for (let i = 0; i < totalLocations; i++) {
    for (let j = 0; j < totalLocations; j++) {
      if (i === j) {
        distMatrix[i][j] = 0;
      } else {
        const locA = locationTree.get(uniqueLocations[i])?.position;
        const locB = locationTree.get(uniqueLocations[j])?.position;
        if (locA && locB) {
          distMatrix[i][j] = MathX.distance(locA, locB);
          next[i][j] = j;
        }
      }
    }
  }

  // **Shortest Path Algo**
  for (let k = 0; k < totalLocations; k++) {
    for (let i = 0; i < totalLocations; i++) {
      for (let j = 0; j < totalLocations; j++) {
        if (distMatrix[i][j] > distMatrix[i][k] + distMatrix[k][j]) {
          distMatrix[i][j] = distMatrix[i][k] + distMatrix[k][j];
          next[i][j] = next[i][k];
        }
      }
    }
  }

  // **Construct Path**
  // Push the Start Location to the Constructed Path Array
  if (userLocation && userLocation.id) {
    constructedPath.push(createStartDestination(userLocation));
  }
  // Set the currentLocation for the Path
  let currentLocation = startLocation;
  let currentLocationIndex = uniqueLocations.indexOf(currentLocation!.id);
  const assignedTasks = new Set<string>();
  const pickedUpPackages: ITask[] = [];
  const droppedPackages: ITask[] = [];
  const visitedLocations = new Set<number>();

  console.log('InitialState:', {
    currentLocation,
    currentLocationIndex,
    constructedPath,
    totalLocations,
    totalTasks,
    currentLoad,
  });

  while (assignedTasks.size < totalTasks) {
    console.log('Current Loop State:', {
      currentLocation,
      currentLocationIndex,
      currentLoad,
    });
    if (currentLocationIndex === -1) {
      console.error('Start Location not found in Location Ids Array');
      return [];
    }
    if (currentLocation != null) {
      // Find Relevant Pickup Tasks
      const availablePickups = pickups
        .filter(
          (task) =>
            task.location.id === currentLocation!.id &&
            !pickedUpPackages.some((t) => t.id === task.id),
        )
        .map((task) => task);

      // Find Relevant Dropoff Tasks
      const availableDropoffs = dropOffs
        .filter(
          (task) =>
            task.location.id === currentLocation!.id &&
            !droppedPackages.some((t) => t.id === task.id),
        )
        .map((task) => task);

      // Initialize Tasks to Pass to new Destination
      const tempTasks: ITask[] = [];

      //Validate DropOffs
      const validDrops = availableDropoffs.filter((task) => {
        const valid = validateDropOff(pickedUpPackages, task);
        if (valid) {
          currentLoad -= task.scu ?? 0;
          return true;
        } else {
          return false;
        }
      });
      tempTasks.push(...validDrops);
      droppedPackages.push(...validDrops);

      //Validate Pickups
      const validPickups = validateCapacity(maxLoad, currentLoad, availablePickups);
      tempTasks.push(...validPickups);
      pickedUpPackages.push(...validPickups);

      const pickedLoad = validPickups.reduce((acc, task) => acc + (task.scu ?? 0), 0);

      if (tempTasks.length > 0) {
        constructedPath.push({
          id: createLocalID('D'),
          stopNumber: 0,
          visited: false,
          location: currentLocation,
          tasks: [...tempTasks],
        });
        tempTasks.forEach((task) => assignedTasks.add(task.id));
        currentLoad += pickedLoad;
      }

      // Mark the Current Location as Assigned
      visitedLocations.add(currentLocationIndex);

      // Find the Next Location
      let nextLocation: number | null = null;
      let minDistance = Infinity;
      for (let i = 0; i < totalTasks; i++) {
        if (
          !visitedLocations.has(i) &&
          distMatrix[currentLocationIndex][i] < minDistance
        ) {
          minDistance = distMatrix[currentLocationIndex][i];
          nextLocation = i;
        }
      }

      // After Finding the Next Location, run Checkpoint Validation
      if (nextLocation !== null) {
        const nextMapped = locationTree.get(uniqueLocations[nextLocation]);
        if (nextMapped) {
          const checkpoint = checkpointValidation(
            currentLocation,
            nextMapped.location,
            nextMapped,
          );
          if (checkpoint) constructedPath.push(checkpoint);

          //Update Current Location
          currentLocation = nextMapped.location;
          currentLocationIndex = nextLocation;
        }
      } else {
        Logger.warn('No Next Location Found, ending Loop...');
        break;
      }
    } else {
      Logger.error('Current Location became null unexpectedly, exiting loop...');
      break;
    }
  }

  // Set all Destination StopNumbers to their Index in the Array
  const orderedPath = constructedPath.map((dest, index) => ({
    ...dest,
    stopNumber: index + 1,
  }));
  return orderedPath;
}
