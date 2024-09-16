import GlassBox from '@Common/Components/Boxes/GlassBox';
import { Box, Button, Typography } from '@mui/material';

export const RouteApp: React.FC<unknown> = () => {
  return (
    <Box
      data-testid="RouteTool__AppContainer"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '100%',
        width: '100%',
        p: '1em',
      }}
    >
      <GlassBox data-testid="RouteTool__RouteViewer_Container" sx={{ p: '1em' }}>
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
      </GlassBox>
    </Box>
  );
};
