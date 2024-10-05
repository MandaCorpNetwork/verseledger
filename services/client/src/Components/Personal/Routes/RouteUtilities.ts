import { ILocation } from 'vl-shared/src/schemas/LocationSchema';
import {
  IDestination,
  IGroupedDestinations,
  IGroupedLocation,
} from 'vl-shared/src/schemas/RoutesSchema';

type Graph = Record<string, Record<string, number>>;

//Create Graph from grouped destinations for Bellman-Ford
// Takes in Grouped Destinations & The Current Location as the Initializer
export function createGraph(
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
export function calculateCost(location1: ILocation, location2: ILocation): number {
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
export function bellmanRouting(graph: Graph, start: IGroupedLocation): BellmanResult {
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
export function getShortestPath(result: BellmanResult): string[] {
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

// Reorder destinations to ensure proper pickup before dropoff order
export function reorderDestinations(destinations: IDestination[]) {
  destinations.sort((a, b) => a.stopNumber - b.stopNumber);
}
