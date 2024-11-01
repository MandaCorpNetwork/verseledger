// import { Float3, MathX } from 'vl-shared/src/math';
// import { ILocation } from 'vl-shared/src/schemas/LocationSchema';
// import { IDestination, IMission, IObjective } from 'vl-shared/src/schemas/RoutesSchema';

import { Float3, MathX } from 'vl-shared/src/math';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

export interface MappedLocation {
  location: ILocation;
  children: Map<string, MappedLocation>;
  parent: MappedLocation;
  get position(): Float3;
}

// function objectiveToDestination(
//   location: ILocation,
//   objective: IObjective,
//   destinations: IDestination[],
//   newDestinations: IDestination[],
//   updatedDestinations: IDestination[],
// ) {
//   const existingDestination = destinations.find(
//     (dest: IDestination) => dest.location.id === location.id,
//   );
//   const updatedDestination = updatedDestinations.find(
//     (dest: IDestination) => dest.location.id === location.id,
//   );
//   const newExistingDestination = newDestinations.find(
//     (dest: IDestination) => dest.location.id === location.id,
//   );

//   if (existingDestination || updatedDestination || newExistingDestination) {
//     if (existingDestination) {
//       const newDestination = {
//         ...existingDestination,
//         objectives: [...(existingDestination.objectives || []), objective],
//       };
//       updatedDestinations.push(newDestination);
//     } else if (updatedDestination) {
//       updatedDestination.objectives = [
//         ...(updatedDestination.objectives || []),
//         objective,
//       ];
//     } else if (newExistingDestination) {
//       newExistingDestination.objectives = [
//         ...(newExistingDestination.objectives || []),
//         objective,
//       ];
//     }
//   } else {
//     const newDestination: IDestination = {
//       id: createDestID(),
//       stopNumber: destinations.length + 1,
//       location,
//       reason: 'Mission',
//       objectives: [objective],
//     };
//     newDestinations.push(newDestination);
//   }
// }

// export function destinationsFromObjectives(
//   objectives: IObjective[],
//   destinations: IDestination[],
//   userLocation: ILocation,
// ) {
//   const onLocation = destinations.find(
//     (dest: IDestination) => dest.location.id === userLocation.id,
//   );
//   const updatedDestinations: IDestination[] = [];
//   const newDestinations: IDestination[] = [];

//   if (!onLocation && userLocation.id != null) {
//     updatedDestinations.push(
//       ...destinations.map((dest) => ({
//         ...dest,
//         stopNumber: dest.stopNumber + 1,
//       })),
//     );
//     const newDestination: IDestination = {
//       id: createDestID(),
//       stopNumber: 1,
//       location: userLocation,
//       reason: 'Start',
//     };
//     newDestinations.push(newDestination);
//   }

//   objectives.forEach((objective: IObjective) => {
//     if (objective.status === 'COMPLETED') return;
//     objectiveToDestination(
//       objective.pickup,
//       objective,
//       destinations,
//       newDestinations,
//       updatedDestinations,
//     );
//     objectiveToDestination(
//       objective.dropOff,
//       objective,
//       destinations,
//       newDestinations,
//       updatedDestinations,
//     );
//   });
//   return { updatedDestinations, newDestinations };
// }

// function validateDropOff(pickedUpPackages: IObjective[], target: IObjective): boolean {
//   return Boolean(pickedUpPackages.find((obj) => obj.packageId === target.packageId));
// }

// function validateCapacity(
//   maxLoad: number,
//   currentLoad: number,
//   availableLoads: IObjective[],
// ): IObjective[] {
//   // Validate If an Objective would Exceed the MaxLoad
//   const validLoads = availableLoads.filter((load) => {
//     const loadValue = load.scu ?? 0;
//     return currentLoad + loadValue <= maxLoad;
//   });

//   // Sort Loads to Prioritize More Objectives over Singular Objectives with large Loads
//   validLoads.sort((a, b) => (a.scu ?? 0) - (b.scu ?? 0));

//   // Pick out as many loads without exceeding Max Load
//   const selectedObjectives: IObjective[] = [];
//   let totalLoad = currentLoad;
//   for (const obj of validLoads) {
//     const loadValue = obj.scu ?? 0;
//     if (totalLoad + loadValue <= maxLoad) {
//       selectedObjectives.push(obj);
//       totalLoad += loadValue;
//     }
//   }

//   return selectedObjectives;
// }

// function checkpointValidation(
//   current: ILocation,
//   next: ILocation,
//   nextMapped: MappedLocation,
// ): IDestination | undefined {
//   if (current.parent !== next.parent && next.parent != null) {
//     const newDestination: IDestination = {
//       id: createDestID(),
//       reason: 'Checkpoint',
//       stopNumber: 0,
//       location: nextMapped.parent.location,
//     };
//     return newDestination;
//   }
//   return undefined;
// }

// function createStartDestination(location: ILocation): IDestination {
//   const newDestination = {
//     id: createDestID(),
//     reason: 'Start',
//     stopNumber: 0,
//     location,
//   };
//   return newDestination;
// }

// function createMissionDestination(
//   location: ILocation,
//   objectives: IObjective[],
// ): IDestination {
//   const newDestination = {
//     id: createDestID(),
//     reason: 'Mission',
//     stopNumber: 0,
//     location,
//     objectives,
//   };
//   return newDestination;
// }

// export function getEfficentDistancePath(
//   missions: IMission[],
//   userLocation: ILocation | null,
//   locationTree: Map<string, MappedLocation>,
//   maxLoad: number,
//   existingLoad: number,
// ): IDestination[] {
//   const foundUserLocation = Boolean(userLocation && userLocation.id);
//   // *Initial Values*
//   // The Constructed Path to be built from Destinations
//   const constructedPath: IDestination[] = [];
//   // Initialize the Current Load
//   let currentLoad: number = existingLoad;
//   // The Pickup Objectives
//   const pickups: { objective: IObjective; location: ILocation }[] = missions.flatMap(
//     (mission) =>
//       mission.objectives.map((obj) => ({
//         objective: obj,
//         location: obj.pickup,
//       })),
//   );
//   // The DropOff Objectives
//   const dropOffs: { objective: IObjective; location: ILocation }[] = missions.flatMap(
//     (mission) =>
//       mission.objectives.map((obj) => ({
//         objective: obj,
//         location: obj.dropOff,
//       })),
//   );
//   // Initialize the Start Location
//   const startLocation = foundUserLocation ? userLocation : pickups[0].location;
//   // Unique Locations Check
//   const uniqueLocations = new Set<string>();
//   missions.forEach((mission) => {
//     mission.objectives.forEach((obj) => {
//       uniqueLocations.add(obj.pickup.id);
//       uniqueLocations.add(obj.dropOff.id);
//     });
//   });
//   if (foundUserLocation && userLocation) {
//     uniqueLocations.add(userLocation.id);
//   }
//   // The Total amount of Locations to be visited
//   const totalLocations = uniqueLocations.size;
//   // The Total Number of Stops
//   const totalStops = missions.reduce(
//     (acc, mission) => acc + mission.objectives.length * 2,
//     0,
//   );
//   // Initialize the Distance Matrix
//   const distMatrix: number[][] = Array.from({ length: totalLocations }, () =>
//     Array(totalLocations).fill(Infinity),
//   );
//   // Initialize the Next Function
//   const next: (number | null)[][] = Array.from({ length: totalLocations }, () =>
//     Array(totalLocations).fill(null),
//   );
//   // All available Location Ids to Pull the Mapped Locations from the Location Tree
//   const locationIds: string[] = Array.from(
//     new Set(
//       missions.flatMap((mission) =>
//         mission.objectives.flatMap((obj) => [obj.pickup.id, obj.dropOff.id]),
//       ),
//     ),
//   );
//   // Push Start Location Id to locationIds for the Pathing Matrix
//   if (foundUserLocation && userLocation && !locationIds.includes(userLocation.id)) {
//     locationIds.push(userLocation.id);
//   }

//   // *Distance Matrix Initalization*
//   for (let i = 0; i < totalLocations; i++) {
//     for (let j = 0; j < totalLocations; j++) {
//       if (i === j) {
//         distMatrix[i][j] = 0;
//       } else {
//         const locA = locationTree.get(locationIds[i])?.position;
//         const locB = locationTree.get(locationIds[j])?.position;
//         if (locA && locB) {
//           distMatrix[i][j] = MathX.distance(locA, locB);
//           next[i][j] = j;
//         }
//       }
//     }
//   }

//   // **Shortest Path Algo**
//   // Floyd-Warshall Algo for all pairs shortest paths
//   for (let k = 0; k < totalLocations; k++) {
//     for (let i = 0; i < totalLocations; i++) {
//       for (let j = 0; j < totalLocations; j++) {
//         if (distMatrix[i][j] > distMatrix[i][k] + distMatrix[k][j]) {
//           distMatrix[i][j] = distMatrix[i][k] + distMatrix[k][j];
//           next[i][j] = next[i][k];
//         }
//       }
//     }
//   }

//   // **Construct Path**
//   // Push the Start Location to the Constructed Path Array
//   if (userLocation && userLocation.id) {
//     constructedPath.push(createStartDestination(userLocation));
//   }

//   // Set the currentLocation for the Path
//   let currentLocation = startLocation;
//   let currentLocationIndex = locationIds.indexOf(currentLocation!.id);
//   // Track Picked Up Packages
//   const pickedUpPackages: IObjective[] = [];
//   // Track Dropped Packages
//   const droppedPackages: IObjective[] = [];
//   // Track objectives by package ID to mark them as picked up or dropped off
//   const assignedObjectives = new Set<number>();
//   // Track visited locations by index
//   const visitedLocations = new Set<number>();

//   console.log('Initial State:', {
//     'Total Locations': totalLocations,
//     'Total Stops': totalStops,
//     'Constructed Path': constructedPath,
//     'Current Load': currentLoad,
//     'Start Location': currentLocation,
//     'Start Location Index': currentLocationIndex,
//   });

//   while (visitedLocations.size < totalStops) {
//     console.log('Current Loop State:', {
//       'Current Location': currentLocation,
//       'Current Location Index': currentLocationIndex,
//       'Current Load': currentLoad,
//       AssignedObjectives: Array.from(assignedObjectives),
//     });
//     if (currentLocationIndex === -1) {
//       console.error('Start Location not found in Location Ids Array');
//       return [];
//     }
//     if (currentLocation != null) {
//       //Find the Objectives Related to the current Location.
//       const availablePickups = pickups
//         .filter(
//           (obj) =>
//             obj.location.id === currentLocation!.id &&
//             !pickedUpPackages.some(
//               (picked) => picked.packageId === obj.objective.packageId,
//             ),
//         )
//         .map((obj) => obj.objective);
//       const availableDropOffs = dropOffs
//         .filter(
//           (obj) =>
//             obj.location.id === currentLocation!.id &&
//             !droppedPackages.some(
//               (picked) => picked.packageId === obj.objective.packageId,
//             ),
//         )
//         .map((obj) => obj.objective);

//       //Initialize Objectives to pass to new Destination
//       const tempObjectives: IObjective[] = [];

//       // Validate DropOffs
//       const validDrops = availableDropOffs.filter((obj) => {
//         const valid = validateDropOff(pickedUpPackages, obj);
//         if (valid) {
//           currentLoad -= obj.scu ?? 0;
//           return true;
//         } else {
//           return false;
//         }
//       });
//       tempObjectives.push(...validDrops);
//       droppedPackages.push(...validDrops);

//       // Validate Pickups
//       const validPickups = validateCapacity(maxLoad, currentLoad, availablePickups);
//       tempObjectives.push(...validPickups);
//       pickedUpPackages.push(...validPickups);

//       const pickedLoad = validPickups.reduce((acc, obj) => acc + (obj.scu ?? 0), 0);

//       if (tempObjectives.length > 0) {
//         // Push the Current Destination to constructedPath
//         constructedPath.push(createMissionDestination(currentLocation, tempObjectives));
//         tempObjectives.forEach((obj) => assignedObjectives.add(obj.packageId));
//         currentLoad += pickedLoad;
//       }

//       // Mark Current location as visited
//       visitedLocations.add(currentLocationIndex);

//       // Find Next Location
//       let nextLocation: number | null = null;
//       let minDistance = Infinity;

//       for (let i = 0; i < totalStops; i++) {
//         if (
//           !visitedLocations.has(i) &&
//           distMatrix[currentLocationIndex][i] < minDistance
//         ) {
//           minDistance = distMatrix[currentLocationIndex][i];
//           nextLocation = i;
//         }
//       }

//       // After Finding the Next Location, run Checkpoint Validation
//       if (nextLocation !== null) {
//         const nextMapped = locationTree.get(locationIds[nextLocation]);
//         if (nextMapped) {
//           const checkpoint = checkpointValidation(
//             currentLocation,
//             nextMapped.location,
//             nextMapped,
//           );
//           if (checkpoint) constructedPath.push(checkpoint);

//           //Update Current Location
//           currentLocation = nextMapped.location;
//           currentLocationIndex = nextLocation;
//         }
//       } else {
//         console.log('No Next Location Found, ending Loop...');
//         break;
//       }
//     } else {
//       console.log('Current Location became null unexpectedly, exiting loop');
//       break;
//     }
//   }

//   // Lastly, set all Destination StopNumbers to their Index in the Array
//   const orderedPath = constructedPath.map((dest, index) => ({
//     ...dest,
//     stopNumber: index,
//   }));
//   return orderedPath;
// }

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
