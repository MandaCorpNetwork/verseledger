import { InDevOverlay } from '@Common/Components/App/InDevOverlay';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { Box, Button, Typography } from '@mui/material';
import { POPUP_CREATE_MISSION } from '@Popups/Mission/AddMission';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectUserLocation } from '@Redux/Slices/Auth/authSelectors';
import { fetchSearchedLocations } from '@Redux/Slices/Locations/actions/fetchSearchedLocations';
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
import { ILocationSearch } from 'vl-shared/src/schemas/SearchSchema';

import { CurrentDestination } from './CurrentDestination';
import { DestinationQue } from './DestinationQue';
import { Mission } from './Mission';
import { NextDestination } from './NextDestination';
import {
  bellmanRouting,
  createGraph,
  getShortestPath,
  reorderDestinations,
} from './RouteUtilities';

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
  React.useEffect(() => {
    // Set Params to search for Parent Locations
    const parentParams: ILocationSearch = {
      page: 0,
      limit: 25,
      category: 'Planet',
    };

    dispatch(fetchSearchedLocations(parentParams)).then((res) => {
      if (fetchSearchedLocations.fulfilled.match(res) && res.payload) {
        setParents(res.payload.data);
      } else {
        setParents(null);
      }
    });
  }, [dispatch]);

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
    if (currentParent == null) return {} as IGroupedLocation;
    return {
      parent: currentParent,
      location: userLocation,
    };
  }, [currentParent, userLocation]);

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
  }, [currentLocation, groupedDestinations, destinations, parents, assignStopNumbers]);

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
        <Typography data-testid="RouteTool__DestinationList_Title" variant="h5">
          Destinations
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
