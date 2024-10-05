import { InDevOverlay } from '@Common/Components/App/InDevOverlay';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { Box, Button, Typography } from '@mui/material';
import { POPUP_CREATE_MISSION } from '@Popups/Mission/AddMission';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectUserLocation } from '@Redux/Slices/Auth/authSelectors';
import { fetchLocations } from '@Redux/Slices/Locations/actions/fetchLocations';
import { selectLocationsByParams } from '@Redux/Slices/Locations/locationSelectors';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import { addDestination } from '@Redux/Slices/Routes/routes.reducer';
import {
  selectDestinations,
  selectMissions,
} from '@Redux/Slices/Routes/routes.selectors';
import { isDev } from '@Utils/isDev';
import React from 'react';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';
import {
  IDestination,
  IGroupedDestinations,
  IGroupedLocation,
  IMission,
  IObjective,
} from 'vl-shared/src/schemas/RoutesSchema';

import { CurrentDestination } from './CurrentDestination';
import { DestinationQue } from './DestinationQue';
import { Mission } from './Mission';
import { NextDestination } from './NextDestination';
import { Logger } from '@Utils/Logger';

type Graph = Record<string, Record<string, number>>;

export const RouteApp: React.FC<unknown> = () => {
  const [parents, setParents] = React.useState<ILocation[] | null>(null);
  const dev = isDev();
  const dispatch = useAppDispatch();

  const userLocation = useAppSelector(selectUserLocation);

  const missions = useAppSelector(selectMissions);

  const destinations = useAppSelector(selectDestinations);

  const handleAddMission = React.useCallback(() => {
    dispatch(openPopup(POPUP_CREATE_MISSION));
  }, [dispatch]);

  const objectives: IObjective[] = missions
    .filter((mission) => mission.objectives && mission.objectives.length > 0)
    .flatMap((mission) => mission.objectives);

  // TODO: Get more efficient way to find parent Locations other than a String

  // Fetch the Parent Locations

  //Fetch All Locations
  React.useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  // Select the parent Locations from the Slice
  const parents = useAppSelector((state) =>
    selectLocationsByParams(state, { category: 'Planet' }),
  );

  // Create Destinations for Objectives
  React.useEffect(() => {
    objectives.forEach((objective: IObjective) => {
      if (objective.status === 'COMPLETED') return;

      const existingPickup = destinations.find(
        (dest: IDestination) => dest.location.id === objective.pickup.id,
      );

      if (existingPickup && existingPickup.objectives) {
        existingPickup.objectives.push(objective);
      } else {
        const newDestination: IDestination = {
          stopNumber: destinations.length + 1,
          location: objective.pickup,
          reason: 'Mission',
          objectives: [objective],
        };
        destinations.push(newDestination);
      }

      const existingDropOff = destinations.find(
        (dest: IDestination) => dest.location.id === objective.dropOff.id,
      );

      if (existingDropOff && existingDropOff.objectives) {
        existingDropOff.objectives.push(objective);
      } else {
        const newDestination: IDestination = {
          stopNumber: destinations.length + 1,
          location: objective.dropOff,
          reason: 'Mission',
          objectives: [objective],
        };
        destinations.push(newDestination);
      }
    });
    Logger.info('Destinations', destinations);
  }, [objectives, destinations]);

  // Group Destinations with their Parent Locations
  const groupedDestinations: IGroupedDestinations[] = React.useMemo(() => {
    if (parents == null || !destinations) return [];
    return parents.map((parent: ILocation) => ({
      parent: parent,
      destinations: destinations.filter(
        (dest) => dest.location.parent === parent.short_name,
      ),
    }));
  }, [parents, destinations]);

  const currentParent = React.useMemo(() => {
    if (parents == null) return;
    return (
      parents.find((parent: ILocation) => userLocation.parent === parent.short_name) ??
      null
    );
  }, [parents, userLocation]);

  const currentLocation: IGroupedLocation = React.useMemo(() => {
    if (currentParent == null)
      return { parent: userLocation, location: userLocation } as IGroupedLocation;
    return {
      parent: currentParent,
      location: userLocation,
    };
  }, [currentParent, userLocation]);

  //Create Graph from grouped destinations for Bellman-Ford
  // Cost Calculation Formula for Distances
  const calculateCost = React.useCallback(
    (location1: ILocation, location2: ILocation): number => {
      const xDiff = location2.x - location1.x;
      const yDiff = location2.y - location1.y;
      const zDiff = location2.z - location1.z;

      const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff + zDiff * zDiff);

      return distance;
    },
    [],
  );
  // Takes in Grouped Destinations & The Current Location as the Initializer
  const createGraph = React.useCallback(
    (groupedDestinations: IGroupedDestinations[], currentLocation: IGroupedLocation) => {
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
      Logger.info('Graph', graph);

      return graph;
    },
    [calculateCost],
  );

  type BellmanResult = {
    distances: { [key: string]: number };
    previous: { [key: string]: string | null };
  };

  // Bellman-Ford Algo Implement
  const bellmanRouting = React.useCallback(
    (graph: Graph, start: IGroupedLocation): BellmanResult => {
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
    },
    [],
  );

  // Calculate the Shortest Path From the Bellman Algo
  const getShortestPath = React.useCallback((result: BellmanResult): string[] => {
    const path: string[] = [];
    let current: string | undefined = Object.keys(result.distances).find(
      (key) => result.distances[key] === 0,
    );

    while (current) {
      path.push(current);
      current = result.previous[current] ?? undefined;
    }

    return path.reverse();
  }, []);

  // Reorder destinations to ensure proper pickup before dropoff order
  const reorderDestinations = React.useCallback((destinations: IDestination[]) => {
    destinations.sort((a, b) => a.stopNumber - b.stopNumber);
  }, []);

  // Assign Stop Numbers to destinations based on the Bellman-Ford output
  const assignStopNumbers = React.useCallback(
    (
      shortestPath: string[],
      destinations: IDestination[],
      parents: ILocation[] | null,
    ) => {
      if (parents == null) return;
      let currentStopNumber = 1;

      const stopOrder: IDestination[] = [];
      let lastParent = '';

      shortestPath.forEach((locationShortName) => {
        const destination = destinations.find(
          (dest) => dest.location.short_name === locationShortName,
        );

        if (!destination) {
          if (lastParent) {
            const parentLocation = parents.find(
              (parent) => parent.short_name === lastParent,
            );
            if (parentLocation) {
              const checkpointDestination: IDestination = {
                stopNumber: currentStopNumber++,
                location: parentLocation,
                reason: 'Checkpoint',
              };
              stopOrder.push(checkpointDestination);
            }
          }
          return;
        }
        if (destination) {
          destination.stopNumber = currentStopNumber++;
          stopOrder.push(destination);

          if (destination.location.parent) {
            lastParent = destination.location.parent;
          }
        }

        stopOrder.forEach((dest) => {
          dispatch(addDestination(dest));
        });
      });
    },
    [dispatch],
  );

  const handleEffCalc = React.useCallback(() => {
    const graph = createGraph(groupedDestinations, currentLocation);
    const shortestPath = getShortestPath(bellmanRouting(graph, currentLocation));
    assignStopNumbers(shortestPath, destinations, parents);
    reorderDestinations(destinations);
  }, [
    currentLocation,
    groupedDestinations,
    destinations,
    parents,
    assignStopNumbers,
    createGraph,
    getShortestPath,
    bellmanRouting,
    reorderDestinations,
  ]);

  return (
    <Box
      data-testid="RouteTool__AppContainer"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '100%',
        width: '100%',
        position: 'relative',
      }}
    >
      <GlassBox
        data-testid="RouteTool__RouteViewer_Container"
        sx={{ p: '1em', gap: '1em' }}
      >
        {!dev && <InDevOverlay />}
        <Box
          data-testid="RouteTool-RouteViewer__Title_Wrapper"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1em',
          }}
        >
          <Typography data-testid="RouteTool-RouteViewer__Title" variant="h5">
            Route Viewer
          </Typography>
          <Button
            data-testid="RouteTool-RouteViewer__OpenWidget__Button"
            variant="popupButton"
          >
            Open Widget
          </Button>
          <Button
            data-testid="RouteTool-RouteViewer__AddStop__Button"
            variant="popupButton"
          >
            Add Stop
          </Button>
        </Box>
        <CurrentDestination />
        <NextDestination />
      </GlassBox>
      <GlassBox
        data-testid="RouteTool__DestinationList__Wrapper"
        sx={{ p: '1em', gap: '1em' }}
      >
        <Typography
          data-testid="RouteTool__DestinationList_Title"
          variant="h5"
          sx={{ justifyContent: 'space-between', display: 'inline-flex' }}
        >
          Destinations
          <Button variant="popupButton" onClick={() => handleEffCalc()}>
            Calculate Route
          </Button>
        </Typography>
        <DestinationQue destinations={destinations} />
      </GlassBox>
      <GlassBox
        data-testid="RouteTool__MissionViewer_Container"
        sx={{ p: '1em', gap: '1em', overflow: 'hidden', height: '100%' }}
      >
        <Box
          data-testid="RouteTool-MissionViewer__TitleWrapper"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1em',
          }}
        >
          <Typography data-testid="RouteTool-MissionViewer__Title" variant="h5">
            Mission Viewer
          </Typography>
          <Button
            data-testid="RouteTool-MissionViewer__AddMission_Button"
            variant="popupButton"
            onClick={handleAddMission}
          >
            Add Mission
          </Button>
        </Box>
        <GlassDisplay sx={{ height: '90%', overflow: 'auto', gap: '1em' }}>
          {missions.map((mission: IMission) => (
            <Mission key={mission.missionId} mission={mission} />
          ))}
        </GlassDisplay>
      </GlassBox>
    </Box>
  );
};
