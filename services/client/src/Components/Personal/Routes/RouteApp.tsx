import { InDevOverlay } from '@Common/Components/App/InDevOverlay';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import { Box, Button, Typography } from '@mui/material';
import { isDev } from '@Utils/isDev';

import { CurrentDestination } from './CurrentDestination';
import { DestinationQue } from './DestinationQue';
import { NextDestination } from './NextDestination';

export const RouteApp: React.FC<unknown> = () => {
  const dev = isDev();
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
      {!dev && <InDevOverlay />}
      <GlassBox
        data-testid="RouteTool__RouteViewer_Container"
        sx={{ p: '1em', gap: '1em' }}
      >
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
            data-testid="RouteTool-RouteViewer__AddStop__Button"
            variant="popupButton"
          >
            Add Stop
          </Button>
        </Box>
        <CurrentDestination />
        <NextDestination />
        <DestinationQue />
      </GlassBox>
      <GlassBox
        data-testid="RouteTool__MissionViewer_Container"
        sx={{ p: '1em', gap: '1em' }}
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
          >
            Add Mission
          </Button>
        </Box>
      </GlassBox>
    </Box>
  );
};
