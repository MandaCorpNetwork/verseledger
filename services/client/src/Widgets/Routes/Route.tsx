import { ComponentContainer } from '@Common/Components/Core/Boxes/ComponentContainer';
import ComponentDisplay from '@Common/Components/Core/Boxes/ComponentDisplay';
import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import { LocationChip } from '@CommonLegacy/Components/Chips/LocationChip';
import { Scu, Scu3d } from '@CommonLegacy/DefinitionsLegacy/CustomIcons';
import {
  binaryLocationTree,
  formatDistance,
  getMappedLocation,
} from '@ComponentsLegacy/Locations/Routes/RouteUtilities';
import {
  AirlineStopsTwoTone,
  ArrowCircleUpTwoTone,
  ArrowDropDownCircleTwoTone,
  ErrorTwoTone,
  MoveDownTwoTone,
} from '@mui/icons-material';
import { Button, Checkbox, IconButton, LinearProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectLocations } from '@Redux/Slices/Locations/locations.selectors';
import {
  nextStop,
  updateActiveTask,
  updateLoad,
} from '@Redux/Slices/Routes/actions/activeRoute.action';
import {
  currentRouteLoad,
  currentRouteStop,
  selectDestinations,
} from '@Redux/Slices/Routes/routes.selectors';
import { VLWidget } from '@Widgets/WidgetWrapper/WidgetWrapper';
import React from 'react';
import { ITask } from 'vl-shared/src/schemas/RoutesSchema';

export const WIDGET_ROUTES = 'routes';

export const RoutesWidget: React.FC = () => {
  const currentDestination = useAppSelector(currentRouteStop);
  const dispatch = useAppDispatch();
  const destinations = useAppSelector(selectDestinations);

  const locations = useAppSelector(selectLocations);

  const locationTree = React.useMemo(() => {
    return binaryLocationTree(locations);
  }, [locations]);

  const sortedDestinations = destinations.sort((a, b) => a.stopNumber - b.stopNumber);
  const currentDestinationIndex = sortedDestinations.findIndex(
    (dest) => dest.id === currentDestination.id,
  );
  const nextDestination = sortedDestinations[currentDestinationIndex + 1];

  const getDistance = React.useCallback(() => {
    const locA = getMappedLocation(locationTree, currentDestination.location.id);
    const locB = getMappedLocation(locationTree, nextDestination.location.id);
    if (locA == null) return `Err«`;
    if (locB == null) return `Err»`;
    return formatDistance(locA, locB);
  }, [currentDestination.location.id, locationTree, nextDestination.location.id]);

  const distance = getDistance();

  const currentLoad = useAppSelector(currentRouteLoad);

  const getSCUDisplay = React.useCallback((task: ITask) => {
    if (task.scu == null) return null;
    const color = task.type === 'pickup' ? 'success.main' : 'warning.main';
    const icon = task.scu > 8 ? <Scu3d fontSize="small" /> : <Scu fontSize="small" />;
    const isInterrupted = task.status === 'INTERUPTED';
    return (
      <Typography
        variant="body2"
        sx={[
          {
            color: color,
            alignItems: 'center',
            display: 'flex',
            gap: '0.5em',
            fontWeight: 'bold',
          },
          isInterrupted && { color: 'error.light' },
        ]}
      >
        {task.scu} {isInterrupted ? <ErrorTwoTone /> : icon}
      </Typography>
    );
  }, []);

  const getTypeIcon = React.useCallback((type: string) => {
    switch (type) {
      case 'pickup':
        return <ArrowCircleUpTwoTone color="inherit" fontSize="small" />;
      case 'dropoff':
        return <ArrowDropDownCircleTwoTone color="inherit" fontSize="small" />;
      default:
        return <AirlineStopsTwoTone color="inherit" fontSize="small" />;
    }
  }, []);

  const getTypeColor = React.useCallback((type: string) => {
    switch (type) {
      case 'pickup':
        return 'success.main';
      case 'dropoff':
        return 'warning.main';
      default:
        return 'info.main';
    }
  }, []);

  const getTypeLabel = React.useCallback((type: string) => {
    switch (type) {
      case 'pickup':
        return 'Pickup';
      case 'dropoff':
        return 'Dropoff';
      default:
        return 'Stop';
    }
  }, []);

  const getTypeDisplay = React.useCallback(
    (task: ITask) => {
      const icon = getTypeIcon(task.type);
      const color = getTypeColor(task.type);
      const label = getTypeLabel(task.type);

      return (
        <Typography
          variant="body2"
          sx={[
            { color: color, display: 'flex', gap: '0.3em' },
            task.status === 'INTERUPTED' && { color: 'error.light' },
          ]}
        >
          {icon} {label}
        </Typography>
      );
    },
    [getTypeIcon, getTypeColor, getTypeLabel],
  );

  const handleComplete = React.useCallback(
    (task: ITask) => {
      if (task.status === 'INTERUPTED') {
        return;
      }

      let scuLoad = currentLoad;
      const isPickup = task.type === 'pickup';
      const isDropoff = task.type === 'dropoff';

      const updatedTask = {
        ...task,
        status: task.status === 'PENDING' ? 'COMPLETED' : 'PENDING',
      } as ITask;
      const updatedDestination = {
        ...currentDestination,
        tasks: currentDestination.tasks.map((t) => (t.id === task.id ? updatedTask : t)),
      };

      if ((isPickup || isDropoff) && task.scu) {
        if (isPickup) {
          scuLoad += task.status === 'PENDING' ? task.scu : -task.scu;
        } else if (isDropoff) {
          scuLoad += task.status === 'PENDING' ? -task.scu : task.scu;
        }
      }
      dispatch(updateLoad(scuLoad));
      dispatch(updateActiveTask({ task: updatedTask, destination: updatedDestination }));
    },
    [currentLoad, currentDestination, dispatch],
  );

  const nextDisabled = currentDestination.tasks.some(
    (task) => task.status !== 'COMPLETED',
  );

  const handleNextDestination = React.useCallback(() => {
    const updatedDestination = { ...currentDestination, visited: true };
    dispatch(nextStop({ updatedDestination, nextDestination }));
  }, [currentDestination, dispatch, nextDestination]);

  //TODO: Weight This With SCU Completion
  //TODO: Buffer Amount from Current Task Completion
  const getCompletion = React.useCallback(() => {
    const totalStops = destinations.length;
    const completedStops = destinations.reduce(
      (sum, dest) => (dest.visited ? sum + 1 : sum),
      0,
    );
    return completedStops / totalStops;
  }, [destinations]);

  const completion = getCompletion();

  return (
    <VLWidget name={WIDGET_ROUTES} title="Route" data-testid="RoutesWidget">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '0.5em 1em',
          gap: '0.5em',
        }}
      >
        <ComponentContainer sx={{ p: '0.2em' }}>
          <ComponentDisplay
            sx={{
              flexDirection: 'row',
              gap: '1em',
              p: '0.2em 0.5em',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'info.main' }}>
              {`${currentDestination.stopNumber}.`}
            </Typography>
            <Typography
              sx={{
                display: 'inline-flex',
                gap: '1em',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Current
              <LocationChip locationId={currentDestination.location.id} />
            </Typography>
          </ComponentDisplay>
          <Typography
            variant="caption"
            sx={{ display: 'inline-flex', mx: 'auto', gap: '0.5em', my: '0.5em' }}
          >
            Current Load:
            <Typography variant="caption">{`${currentLoad} SCU`}</Typography>
          </Typography>
          <FeatureDisplay sx={{ maxHeight: '75px', py: '0.2em', overflow: 'auto' }}>
            {currentDestination.tasks.map((task) => {
              const scuDisplay = getSCUDisplay(task);
              const typeDisplay = getTypeDisplay(task);
              return (
                <div
                  key={task.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox
                      size="small"
                      color="success"
                      checked={task.status === 'COMPLETED'}
                      disabled={task.status === 'INTERUPTED'}
                      onChange={() => handleComplete(task)}
                    />
                    <Typography variant="body2">{task.label}</Typography>
                  </div>
                  {task.scu ? scuDisplay : typeDisplay}
                  <IconButton disabled>
                    <MoveDownTwoTone color="info" sx={{ opacity: '0.4' }} />
                  </IconButton>
                </div>
              );
            })}
          </FeatureDisplay>
        </ComponentContainer>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <ComponentContainer sx={{ p: '0.2em' }}>
            <ComponentDisplay
              sx={{
                flexDirection: 'row',
                gap: '1em',
                p: '0.2em 0.5em',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontWeight: 'bold', color: 'info.main' }}
              >
                {`${nextDestination.stopNumber}.`}
              </Typography>
              <Typography
                sx={{
                  display: 'inline-flex',
                  gap: '1em',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Next
                <LocationChip locationId={nextDestination.location.id} />
              </Typography>
            </ComponentDisplay>
            <Typography
              variant="caption"
              sx={{ display: 'inline-flex', mx: 'auto', gap: '0.5em', my: '0.5em' }}
            >
              Distance:
              <Typography variant="caption">{`${distance}`}</Typography>
            </Typography>
          </ComponentContainer>
          <div style={{ display: 'flex', gap: '0.2em' }}>
            <Button size="small" variant="contained" disabled>
              Add Stop
            </Button>
            <Button
              size="small"
              variant="contained"
              color="success"
              disabled={nextDisabled}
              onClick={handleNextDestination}
            >
              Next Stop
            </Button>
          </div>
        </div>
      </div>
      <LinearProgress sx={{ mt: '0.5em' }} variant="determinate" value={completion} />
    </VLWidget>
  );
};
