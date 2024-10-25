import { WorkZoneBar } from '@Common/Components/App/InDevelopment';
import { Box } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import {
  selectDestinations,
  selectMissions,
} from '@Redux/Slices/Routes/routes.selectors';
import React from 'react';

import { DestinationQue } from './DestinationQue/DestinationQue';
import { MissionViewer } from './MissionViewer';

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
        gap: { xs: '1em', lg: '2em' },
        flexGrow: 1,
        p: '.5em',
        position: 'relative',
      }}
    >
      <WorkZoneBar side="top" severity="construction" speed="slow" />
      <WorkZoneBar side="bottom" severity="construction" speed="slow" />
      {/* <RouteViewer destinations={destinations} /> */}
      <DestinationQue destinations={destinations} missions={missions} />
      <MissionViewer missions={missions} />
    </Box>
  );
};
