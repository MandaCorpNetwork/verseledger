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
  addDestinations,
  updateDestinations,
} from '@Redux/Slices/Routes/actions/destinationActions';
import {
  selectDestinations,
  selectMissions,
} from '@Redux/Slices/Routes/routes.selectors';
import { isDev } from '@Utils/isDev';
import React from 'react';
import { IDestination, IMission } from 'vl-shared/src/schemas/RoutesSchema';

import { CurrentDestination } from './CurrentDestination';
import { DestinationQue } from './DestinationQue';
import { Mission } from './Mission';
import { NextDestination } from './NextDestination';

export const RouteApp: React.FC<unknown> = () => {
  const dev = isDev();
  const dispatch = useAppDispatch();

  const missions = useAppSelector(selectMissions);

  const destinations = useAppSelector(selectDestinations);

  const userLocation = useAppSelector(selectUserLocation);

  const handleAddMission = React.useCallback(() => {
    dispatch(openPopup(POPUP_CREATE_MISSION));
  }, [dispatch]);

  //Fetch All Locations
  React.useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const locations = useAppSelector(selectLocationsArray);

  const locationTree = React.useMemo(() => {
    return binaryLocationTree(locations);
  }, [locations]);

  const checkpointChecker = React.useCallback(
    (orderedDestinations: IDestination[]) => {
      const updatedDestinations: IDestination[] = [];
      console.log('Checkpoint Check Initialization...');
      console.log('Passed Array:', orderedDestinations);
      console.log('Initialized Update:', updatedDestinations);
      for (let i = 0; i < orderedDestinations.length - 1; i++) {
        const current = orderedDestinations[i];
        const next = orderedDestinations[i + 1];
        console.log(`Step ${i}`);
        console.log('Current', current);
        console.log('Next', next);
        updatedDestinations.push(current);
        if (next) {
          const nextMappedLocation = locationTree.get(next.location.id);
          if (
            nextMappedLocation &&
            current.location.parent !== next.location.parent &&
            next.location.parent != null &&
            current.location !== next.location &&
            current.reason !== 'Checkpoint'
          ) {
            console.log(`Creating Checkpoint between`, current, next);
            const checkpoint: IDestination = {
              id: createDestID(),
              stopNumber: 0,
              reason: 'Checkpoint',
              location: nextMappedLocation.parent.location,
            };
            updatedDestinations.push(checkpoint);
            dispatch(addDestinations([checkpoint]));
          }
        }
      }
      updatedDestinations.push(orderedDestinations[orderedDestinations.length - 1]);
      console.log('Route with Checkpoints', updatedDestinations);
      return updatedDestinations;
    },
    [locationTree, dispatch],
  );

  const stopReorder = React.useCallback(
    (orderedDestinations: IDestination[]) => {
      console.log('Stop Reorder Initialization..', orderedDestinations);
      const updatedDestinations = orderedDestinations.map((destination, index) => ({
        ...destination,
        stopNumber: index + 1,
      }));
      dispatch(updateDestinations(updatedDestinations));
      console.log('Updated Stop Order', updatedDestinations);
      return updatedDestinations;
    },
    [dispatch],
  );

  // Start Location Initializer
  const initializeStartLocation = React.useCallback(() => {
    const onLocation = destinations.find(
      (dest: IDestination) => dest.location.id === userLocation.id,
    );
    const updatedDestinations: IDestination[] = [];
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
      dispatch(updateDestinations(updatedDestinations));
      dispatch(addDestinations([newDestination]));
    }
  }, [dispatch, userLocation, destinations]);

  const getShortestPathing = React.useCallback(() => {
    // Initialize Start Location
    initializeStartLocation();
    const shortestPath = floydWarshallRoute(destinations, locationTree);
    const pathWithCheckpoints = checkpointChecker(shortestPath);
    const updatedLocations = stopReorder(pathWithCheckpoints);
    console.log('Final Order:', updatedLocations);
    return updatedLocations;
  }, [
    initializeStartLocation,
    checkpointChecker,
    stopReorder,
    destinations,
    locationTree,
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
