import GlassBox from '@Common/Components/Boxes/GlassBox';
import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { DoubleArrow } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useAppDispatch } from '@Redux/hooks';
import { deleteDestination } from '@Redux/Slices/Routes/actions/destination.action';
import { openWidget } from '@Redux/Slices/Widgets/widgets.actions';
import { WIDGET_ROUTES } from '@Widgets/Routes/Routes';
import React from 'react';
import { IDestination } from 'vl-shared/src/schemas/RoutesSchema';

import { CurrentDestination } from './CurrentDestination';
import { NextDestination } from './NextDestination';
import { OtherStop } from './OtherStop';

type RouteViewerProps = {
  destinations: IDestination[];
};

export const RouteViewer: React.FC<RouteViewerProps> = ({ destinations }) => {
  const dispatch = useAppDispatch();
  const nextStopEnabled = React.useCallback(() => {
    if (!destinations || destinations.length === 0) {
      return true;
    }
    if (destinations.length > 0) {
      const destination = destinations[0];
      if (destination.objectives) {
        return destination.objectives.some(
          (obj) =>
            (obj.pickup.id === destination.location.id && obj.status === 'OBTAINED') ||
            (obj.dropOff.id === destination.location.id && obj.status === 'COMPLETED'),
        );
      } else {
        return true;
      }
    }
  }, [destinations]);

  const allowNextStop = nextStopEnabled();

  const handleDeleteDestination = React.useCallback(
    (destinationId: string) => {
      dispatch(deleteDestination(destinationId));
    },
    [dispatch],
  );

  const handleOpenRouteWidget = React.useCallback(() => {
    dispatch(openWidget(WIDGET_ROUTES));
  }, [dispatch]);
  return (
    <GlassBox
      data-testid="RouteTool__RouteViewer_Container"
      sx={{ p: '1em', gap: '1em', height: '100%', overflow: 'hidden' }}
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
          data-testid="RouteTool-RouteViewer__OpenWidget__Button"
          variant="popupButton"
          onClick={handleOpenRouteWidget}
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
      {destinations && destinations.length > 0 && (
        <GlassBox
          data-testid="RouteTool-RouteViewer__DestinationViewer_Container"
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            p: '.5em',
            gap: '1em',
          }}
        >
          {destinations[0].reason === 'Mission' ? (
            <CurrentDestination
              destination={destinations[0]}
              nextDestination={destinations[1] ?? undefined}
            />
          ) : (
            <OtherStop
              destination={destinations[0]}
              nextDestination={destinations[1] ?? undefined}
            />
          )}
          {destinations.slice(1).map((dest, index) => {
            const originalIndex = index + 1; // Adjust for the slice
            const nextDestination = destinations[originalIndex + 1] ?? undefined;
            return dest.reason === 'Mission' ? (
              <NextDestination
                key={dest.id}
                destination={dest}
                nextDestination={nextDestination}
              />
            ) : (
              <OtherStop
                key={dest.id}
                destination={dest}
                nextDestination={nextDestination}
              />
            );
          })}
          <Button
            data-testid="RouteTool-RouteViewer-DestinationViewer__NextStop_Button"
            variant="contained"
            color="success"
            endIcon={<DoubleArrow />}
            disabled={!allowNextStop}
            onClick={() => handleDeleteDestination(destinations[0].id)}
            sx={{
              position: 'sticky',
              bottom: 0,
              mb: '5px',
              mr: '5px',
              ml: 'auto',
              width: '200px',
            }}
          >
            Next Stop
          </Button>
        </GlassBox>
      )}
      {(destinations.length === 0 || destinations == null) && (
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            width: '100%',
            color: 'grey',
            textShadow: '0 0 3px rgb(0,0,0), 0 0 10px rgba(0,0,0,.7)',
            mt: '5em',
          }}
        >
          No Routes
        </Typography>
      )}
    </GlassBox>
  );
};
