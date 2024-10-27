import { Box } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import {
  selectDestinations,
  selectMissions,
} from '@Redux/Slices/Routes/routes.selectors';
import React from 'react';

import { DestinationQue } from './DestinationQue/DestinationQue';
import { MissionViewer } from './MissionViewer/MissionViewer';

export const RouteApp: React.FC<unknown> = () => {
  const missions = useAppSelector(selectMissions);

  const destinations = useAppSelector(selectDestinations);

  //Fetch All Locations
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
      <DestinationQue destinations={destinations} missions={missions} />
      <MissionViewer missions={missions} />
    </Box>
  );
};
