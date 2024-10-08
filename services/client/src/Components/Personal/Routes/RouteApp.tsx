import { InDevOverlay } from '@Common/Components/App/InDevOverlay';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { Box, Button, Typography } from '@mui/material';
import { POPUP_CREATE_MISSION } from '@Popups/Mission/AddMission';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectUserLocation } from '@Redux/Slices/Auth/authSelectors';
import { fetchLocations } from '@Redux/Slices/Locations/actions/fetchLocations';
import { selectLocationsArray } from '@Redux/Slices/Locations/locationSelectors';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import {
  selectDestinations,
  selectMissions,
} from '@Redux/Slices/Routes/routes.selectors';
import { isDev } from '@Utils/isDev';
import { Logger } from '@Utils/Logger';
import React from 'react';
import { MathX } from 'vl-shared/src/math';
import { IDestination, IMission, IObjective } from 'vl-shared/src/schemas/RoutesSchema';

import { CurrentDestination } from './CurrentDestination';
import { DestinationQue } from './DestinationQue';
import { Mission } from './Mission';
import { NextDestination } from './NextDestination';

export const RouteApp: React.FC<unknown> = () => {
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

  //Fetch All Locations
  React.useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const locations = useAppSelector(selectLocationsArray);

  const locationTree = React.useMemo(() => {
    return binaryLocationTree(locations);
  }, [locations]);
  console.log(locationTree);

  // TODO: Get more efficient way to find parent Locations other than a String

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
          id: createDestID(),
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
          id: createDestID(),
          stopNumber: destinations.length + 1,
          location: objective.dropOff,
          reason: 'Mission',
          objectives: [objective],
        };
        destinations.push(newDestination);
      }
    });
  }, [objectives, destinations]);

  // Measures the Distance from each Location to find efficient Routes To and From Various Destination points within all Objectives

  // LOCATIONS:
  // Pickup Location
  // DropOff Location
  // Jumps between Parents

  //Efficency Routing from Locations to the next Location while accounting for new Checkpoints

  // Bellman-Ford Algo Implement
  const floydWarshallRoute = React.useCallback(() => {
    const numLocations = destinations.length; //Total Amount of SET stops
    const distMatrix: number[][] = Array.from({ length: numLocations }, () =>
      Array(numLocations).fill(Infinity),
    ); // Matrix allowing for the sorting of distances
    const next: (number | null)[][] = Array.from({ length: numLocations }, () =>
      Array(numLocations).fill(null),
    ); // The Identification of each stop
    const locationIds = destinations.map((dest) => dest.location.id); // All available Location Ids to pull from the Location Tree

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

    const startLocation = 0;
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

    Logger.info('DestMatix', distMatrix);
    Logger.info('Next', next);
    Logger.info('Route Stops', destinations);
    Logger.info('Optimized Route Path', orderedDestinations);

    //Organize the Array of Destinations. Maybe by changing the stop numbers.
    return orderedDestinations;
  }, [locationTree, destinations]);

  const getShortestPathing = React.useCallback(() => {
    const shortestPaths = floydWarshallRoute();
    return shortestPaths;
  }, [floydWarshallRoute]);
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
          <Button variant="popupButton" onClick={() => getShortestPathing()}>
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
