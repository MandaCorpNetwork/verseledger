import GlassBox from '@Common/Components/Boxes/GlassBox';
import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { nextStop } from '@Redux/Slices/Routes/actions/activeRoute.action';
import { currentRouteStop } from '@Redux/Slices/Routes/routes.selectors';
import { openWidget } from '@Redux/Slices/Widgets/widgets.actions';
import { WIDGET_ROUTES } from '@Widgets/Routes/Route';
import React from 'react';
import { IDestination } from 'vl-shared/src/schemas/RoutesSchema';

import { formatDistance, getMappedLocation, MappedLocation } from '../RouteUtilities';
import { CheckpointDestination } from './CheckpointDestination';
import { CurrentDestination } from './CurrentDestination';
import { NextDestination } from './NextDestination';
import { RouteViewerTable } from './RouteViewerTable';

type RouteViewerProps = {
  destinations: IDestination[];
  locationTree: Map<string, MappedLocation>;
};

export const RouteViewer: React.FC<RouteViewerProps> = ({
  destinations,
  locationTree,
}) => {
  const currentDestination = useAppSelector(currentRouteStop);
  const dispatch = useAppDispatch();
  const currentDestinationIndex = destinations.findIndex(
    (dest) => dest.id == currentDestination.id,
  );
  const nextDestination = destinations[currentDestinationIndex + 1];
  const nextIsCheckpoint = nextDestination.tasks.some(
    (task) => task.type === 'checkpoint',
  );
  const followingStop = destinations[currentDestinationIndex + 2];

  const getDistance = React.useCallback(
    (idA: string, idB: string) => {
      if (idA == null) return `Err«`;
      if (idB == null) return `Err»`;
      const locA = getMappedLocation(locationTree, idA);
      const locB = getMappedLocation(locationTree, idB);
      if (locA == null) return `Err«`;
      if (locB == null) return `Err»`;
      return formatDistance(locA, locB);
    },
    [locationTree],
  );

  const nextDistance = getDistance(
    currentDestination.location.id,
    nextDestination.location.id,
  );

  const followingDistance = getDistance(
    nextDestination.location.id,
    followingStop?.location.id,
  );

  const nextDisabled = currentDestination.tasks.some(
    (task) => task.status !== 'COMPLETED',
  );

  const handleNextDestination = React.useCallback(() => {
    const updatedDestination = { ...currentDestination, visited: true };
    dispatch(nextStop({ updatedDestination, nextDestination }));
  }, [currentDestination, dispatch, nextDestination]);

  const handleOpenWidget = React.useCallback(() => {
    dispatch(openWidget(WIDGET_ROUTES));
  }, [dispatch]);
  return (
    <GlassBox
      data-testid="RouteTool__RouteViewer_Container"
      sx={{ p: '1em', gap: '1em', height: '100%', overflow: 'hidden' }}
    >
      <div
        data-testid="RouteTool-RouteViewer__Title_Wrapper"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1em',
        }}
      >
        <Typography data-testid="RouteTool-RouteViewer__Title" variant="h4">
          Route Viewer
        </Typography>
        <div style={{ gap: '1em', display: 'flex' }}>
          <Button variant="contained" onClick={handleOpenWidget}>
            Open Widget
          </Button>
          <Button
            variant="contained"
            disabled={nextDisabled}
            onClick={handleNextDestination}
          >
            Next Stop
          </Button>
          <Button variant="contained" disabled>
            Add Stop
          </Button>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1, gap: '1em' }}>
        <GlassDisplay
          sx={{ p: '1em', height: '100%', gap: '1em', justifyContent: 'space-around' }}
        >
          <CurrentDestination destination={currentDestination} />
          {nextIsCheckpoint && nextDestination.tasks.length <= 1 && (
            <CheckpointDestination
              destination={nextDestination}
              distance={nextDistance}
            />
          )}
          {nextIsCheckpoint && nextDestination.tasks.length <= 1 && (
            <NextDestination destination={followingStop} distance={followingDistance} />
          )}
          {(!nextIsCheckpoint || nextDestination.tasks.length > 1) && (
            <NextDestination destination={nextDestination} distance={nextDistance} />
          )}
        </GlassDisplay>
        <GlassDisplay sx={{ p: '1em' }}>
          <RouteViewerTable destinations={destinations} locationTree={locationTree} />
        </GlassDisplay>
      </div>
    </GlassBox>
  );
};
