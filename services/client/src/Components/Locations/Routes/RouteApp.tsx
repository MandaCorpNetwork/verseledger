import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
// import { selectUserLocation } from '@Redux/Slices/Auth/auth.selectors';
import { fetchLocations } from '@Redux/Slices/Locations/actions/fetchLocations.action';
// import { selectLocationsArray } from '@Redux/Slices/Locations/locations.selectors';
import { selectTasks } from '@Redux/Slices/Routes/routes.selectors';
import React from 'react';

// import { DestinationQue } from './DestinationQue/DestinationQue';
import { MissionViewer } from './MissionViewer/MissionViewer';
// import { binaryLocationTree } from './RouteUtilities';

export const RouteApp: React.FC<unknown> = () => {
  const tasks = useAppSelector(selectTasks);

  // const destinations = useAppSelector(selectDestinations);

  //Fetch All Locations
  //TODO: This will become highly taxing and be better moved to Local Storage for referencing
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  // const locations = useAppSelector(selectLocationsArray);

  // const userLocation = useAppSelector(selectUserLocation);

  // const locationTree = React.useMemo(() => {
  //   return binaryLocationTree(locations);
  // }, [locations]);
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
      {/* <RouteViewer destinations={destinations} /> */}
      {/* <DestinationQue
        destinations={destinations}
        // tasks={tasks}
        locationTree={locationTree}
      /> */}
      <MissionViewer tasks={tasks} />
    </Box>
  );
};
