import { useSoundEffect } from '@Audio/AudioManager';
import { DoubleArrow } from '@mui/icons-material';
import { Box, Collapse, IconButton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { fetchLocations } from '@Redux/Slices/Locations/actions/fetchLocations.action';
import { selectLocationsArray } from '@Redux/Slices/Locations/locations.selectors';
import {
  routingActive,
  selectDestinations,
  selectTasks,
} from '@Redux/Slices/Routes/routes.selectors';
import React from 'react';

import { DestinationQue } from './DestinationQue/DestinationQue';
import { MissionViewer } from './MissionViewer/MissionViewer';
import { binaryLocationTree } from './RouteUtilities';
import { RouteViewer } from './RouteViewer/RouteViewer';

export const RouteApp: React.FC<unknown> = () => {
  const tasks = useAppSelector(selectTasks);

  const destinations = useAppSelector(selectDestinations);
  const sound = useSoundEffect();

  //Fetch All Locations
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const locations = useAppSelector(selectLocationsArray);

  // const userLocation = useAppSelector(selectUserLocation);

  const locationTree = React.useMemo(() => {
    return binaryLocationTree(locations);
  }, [locations]);

  const activeRouting = useAppSelector(routingActive);

  const [detailsOpen, setDetailsOpen] = React.useState<boolean>(true);

  const handleToggleDetails = React.useCallback(() => {
    setDetailsOpen((prev) => {
      if (prev) {
        sound.playSound('close');
      } else {
        sound.playSound('open');
      }
      return !prev;
    });
  }, [setDetailsOpen, sound]);
  return (
    <Box
      data-testid="RouteTool__AppContainer"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-around',
        width: '100%',
        height: '100%',
        gap: { xs: '1em', lg: '2em' },
        p: '.5em',
      }}
    >
      {activeRouting && <RouteViewer destinations={destinations} />}
      {activeRouting && (
        <Collapse
          collapsedSize="60px"
          in={detailsOpen}
          orientation="horizontal"
          sx={{
            position: 'absolute',
            right: 0,
            display: 'flex',
            flexDirection: 'row',
            zIndex: 50,
            flexGrow: 1,
          }}
        >
          <div style={{ display: 'flex', gap: '2em', backdropFilter: 'blur(20px)' }}>
            <IconButton onClick={handleToggleDetails}>
              <DoubleArrow
                fontSize="large"
                sx={{
                  transform: `rotate(${detailsOpen ? '0deg' : '180deg'})`,
                  transition: 'opacity 0.3s ease-in-out, transform 0.2s ease-in-out',
                }}
              />
            </IconButton>
            <DestinationQue
              destinations={destinations}
              // tasks={tasks}
              locationTree={locationTree}
            />
            <MissionViewer tasks={tasks} />
          </div>
        </Collapse>
      )}
      {!activeRouting && (
        <DestinationQue
          destinations={destinations}
          // tasks={tasks}
          locationTree={locationTree}
        />
      )}
      {!activeRouting && <MissionViewer tasks={tasks} />}
    </Box>
  );
};
