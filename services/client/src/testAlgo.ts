//Psuedo & WhiteText For Middleware algo

import { fetchSearchedLocations } from '@Redux/Slices/Locations/actions/fetchSearchedLocations';
import { AppDispatch, RootState } from '@Redux/store';
import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import {
  IMission,
  IObjective,
  IDestination,
  IGroupedDestinations,
  IGroupedLocation,
} from 'vl-shared/src/schemas/RoutesSchema';
import { ILocationSearch } from 'vl-shared/src/schemas/SearchSchema';
import { Logger } from '@Utils/Logger';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

/*
Explination:
Whenever a new Mission is Created, the new Mission contains Objective Objects that have a Dropoff And Pickup Location

If a Destination does not exist for a Pickup Location we need to Create a Destination & Add the objective to the Destination's Objectives List.

Otherwise if it does exist, we need to add the Objective to a Preexisting Destination for the Pickup Location.

If a Destination does not exist for a DropOff Location, we meed to Create a Destination & Add the objective to the New Destination's Objective List.

Otherwise, if it does exist, we need to add the Objective to a Preexisting Destination for the DropOff Location.

Sticky part is, we need to ensure Each Objective on Destinations has it's Pickup Location Before Dropoff Location, otherwise we need to Create another Destination for the Dropoff Location if the location will need to be revisited.

But at the same time we want to use the Bellman Ford Algorithm to Create the Most efficient Route.

Additionally, each locations Coordiante is relative to it's local planet, so we will need to efficiently route to planets aswell and add them as their own destination.

Destination Objectives allow for stop numbers, so we can change the stop numbers in order to properly sort them. 
*/

const destinationCreation: Middleware<unknown, RootState> =
  ({ dispatch, getState }: { dispatch: AppDispatch; getState: () => RootState }) =>
  (next) =>
  (action) => {
    const result = next(action);
    const state = getState();
    const userLocation = state.auth.userLocation;

    //Checks if the addMission is ran
    if ((action as PayloadAction<IMission>).type === 'routes/addMission') {
      // **Fetch Current Route State Data**

      // Define all missions Existing on the state
      const missions = state.routes.missions;
      // Define all destinations existing on the state
      const destinations: IDestination[] = Object.values(state.routes.destinations);
      // Define all Objectives
      const objectives = Object.values(missions)
        .filter((mission) => mission.objectives && mission.objectives.length > 0)
        .flatMap((mission) => mission.objectives);

      // TODO: Get more efficient way to find parent Locations other than a String
      // Set Params to search for Parent Locations
      const parentParams: ILocationSearch = {
        page: 0,
        limit: 200,
        category: 'Planet',
      };
      // Fetch the Parent Locations
      const parents = await dispatch(fetchSearchedLocations(parentParams)).then((res) => {
        if (fetchSearchedLocations.fulfilled.match(res) && res.payload) {
          return res.payload.data as ILocation[];
        } else {
          return null;
        }
      });

      // Escape Process if Parents fails to Fetch
      if (parents == null) return Logger.warn('Parent Locations Search Failed');

      // Set the Current Parent Location
      const currentParent =
        parents.find((parent: ILocation) => userLocation.parent === parent.short_name) ??
        null;
      // Create a User Grouped Location
      const currentLocation: IGroupedLocation = {
        parent: currentParent,
        location: userLocation,
      };

      // **Start Evaluating Every Objective to create Destinations**

      objectives.forEach((objective: IObjective) => {
        //Checks if the Objective has already been completed
        if (objective.status === 'COMPLETED') return;

        // Handle Pickup Locations
        // Check to see if the pickupLocation already exists as a Destination
        const pickupExists = destinations.find(
          (dest: IDestination) => dest.location.id === objective.pickup.id,
        );

        if (pickupExists && pickupExists.objectives) {
          // If the destination exists, pushes the objective to the Destination
          pickupExists.objectives.push(objective);
        } else {
          // If a Destination does not exist, creates one.
          const newDestination: IDestination = {
            stopNumber: destinations.length + 1,
            location: objective.pickup,
            reason: 'Mission',
            objectives: [objective],
          };
          state.routes.destinations[newDestination.stopNumber] = newDestination;
        }

        // Handle Dropoff Locations
        // Check to see if the dropOffLocation already exists as a Destination
        const dropOffExists = destinations.find(
          (dest) => dest.location.id === objective.dropOff.id,
        );
        if (dropOffExists && dropOffExists.objectives) {
          // If the destination exists, pushes the objective to the Destination
          dropOffExists.objectives.push(objective);
        } else {
          // If a Destination does not exist, creates one.
          const newDestination: IDestination = {
            stopNumber: destinations.length + 1,
            location: objective.dropOff,
            reason: 'Mission',
            objectives: [objective],
          };
          state.routes.destinations[newDestination.stopNumber] = newDestination;
        }
      });

      // Group Destinations with their Parent Locations
      const groupedDestinations = parents.map((parent: ILocation) => ({
        parent: parent,
        destinations: destinations.filter(
          (dest) => dest.location.parent === parent.short_name,
        ),
      }));

      // **Bellman-Ford Integration**

      //Define Graph
      const graph = createGraph(groupedDestinations, currentLocation);

      //Calculate an Optimal Path
      const shortestPath = getShortestPath(bellmanRouting(graph, currentLocation));

      // Update Stop numbers based on the calculated shortest Path & Add Checkpoints
      assignStopNumbers(shortestPath, destinations);

      // Reorder destinations to ensure pickups happen before dropoffs
      reorderDestinations(destinations);
    }

    return result;
  };

// Helper Functions

type Graph = Record<string, Record<string, number>>;

//Create Graph from grouped destinations for Bellman-Ford
// Takes in Grouped Destinations & The Current Location as the Initializer
function createGraph(
  groupedDestinations: IGroupedDestinations[],
  currentLocation: IGroupedLocation,
) {
  const graph: Graph = {};

  groupedDestinations.forEach((group) => {
    const fromParent = group.parent.short_name;

    group.destinations.forEach((dest) => {
      const toChild = dest.location.short_name;
      const cost = calculateCost(currentLocation.location, dest.location);

      // Initialize graph's entry for the "From" location
      if (!graph[toChild]) {
        graph[toChild] = {};
      }
      graph[toChild][fromParent] = cost;

      // Add the destination to the graph from the Parent Location
      graph[fromParent][toChild] = cost;

      // Adds a reverse connection point for bidirectionality
      graph[fromParent] = graph[fromParent] || {};
      graph[fromParent][toChild] = calculateCost(dest.location, group.parent);
    });
  });

  return graph;
}

// Cost Calculation Formula for Distances
function calculateCost(location1: ILocation, location2: ILocation): number {
  const xDiff = location2.x - location1.x;
  const yDiff = location2.y - location1.y;
  const zDiff = location2.z - location1.z;

  const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff + zDiff * zDiff);

  return distance;
}

type BellmanResult = {
  distances: { [key: string]: number };
  previous: { [key: string]: string | null };
};

// Bellman-Ford Algo Implement
function bellmanRouting(graph: Graph, start: IGroupedLocation): BellmanResult {
  const distances: { [node: string]: number } = {};
  const previous: { [node: string]: string | null } = {};

  Object.keys(graph).forEach((node) => {
    distances[node] = Infinity;
    previous[node] = null;
  });
  distances[start.parent.short_name ?? start.location.short_name] = 0;

  const nodesCount = Object.keys(graph).length;

  for (let i = 0; i < nodesCount - 1; i++) {
    for (const from in graph) {
      for (const to in graph[from]) {
        const cost = graph[from][to];
        if (distances[from] + cost < distances[to]) {
          distances[to] = distances[from] + cost;
          previous[to] = from;
        }
      }
    }
  }

  // Check for negative cycles
  for (const from in graph) {
    for (const to in graph[from]) {
      const cost = graph[from][to];
      if (distances[from] + cost < distances[to]) {
        throw new Error('Graph contains a negative-weight cycle');
      }
    }
  }

  return { distances, previous };
}

// Calculate the Shortest Path From the Bellman Algo
function getShortestPath(result: BellmanResult): string[] {
  const path: string[] = [];
  let current: string | undefined = Object.keys(result.distances).find(
    (key) => result.distances[key] === 0,
  );

  while (current) {
    path.push(current);
    current = result.previous[current] ?? undefined;
  }

  return path.reverse();
}

// Assign Stop Numbers to destinations based on the Bellman-Ford output
function assignStopNumbers(shortestPath: string[], destinations: IDestination[]) {
  let currentStopNumber = 1;

  const stopOrder: IDestination[] = [];
  let lastParent = '';

  shortestPath.forEach((locationShortName) => {
    const destination = destinations.find((dest) => dest.location.short_name === locationShortName);

    if (!destination) {
      if (lastParent && lastParent !== destination.location.parent) {
        const checkpointDestination: IDestination = {
          stopNumber: currentStopNumber++,
          location: { short_name: lastParent },
          reason: 'Checkpoint',
        };
        stopOrder.push(checkpointDestination);
      }
      return;
    }
    destination.stopNumber = currentStopNumber++;
    stopOrder.push(destination);

    lastParent == destination.location.parent;

    stopOrder.forEach((dest) => {
      state.routes.destinations[dest.stopNumber] = dest;
    });
  }};

// Reorder destinations to ensure proper pickup before dropoff order
function reorderDestinations(destinations) {
  destinations.sort((a, b) => a.stopNumber - b.stopNumber);
}
