import { useSoundEffect } from '@Audio/AudioManager';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { Scu, Scu3d } from '@Common/Definitions/CustomIcons';
import {
  AirlineStopsTwoTone,
  ArrowCircleUpTwoTone,
  ArrowDropDownCircleTwoTone,
  ErrorTwoTone,
  MoveDownTwoTone,
} from '@mui/icons-material';
import { Checkbox, IconButton, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import {
  updateActiveTask,
  updateLoad,
} from '@Redux/Slices/Routes/actions/activeRoute.action';
import { currentRouteLoad } from '@Redux/Slices/Routes/routes.selectors';
import React from 'react';
import { IDestination, ITask } from 'vl-shared/src/schemas/RoutesSchema';

type RouteViewerTaskProps = {
  task: ITask;
  destination: IDestination;
  current?: boolean;
};

export const Task: React.FC<RouteViewerTaskProps> = ({
  task,
  destination,
  current = false,
}) => {
  const sound = useSoundEffect();
  const dispatch = useAppDispatch();
  const currentLoad = useAppSelector(currentRouteLoad);
  const getTypeIcon = React.useCallback(() => {
    switch (task.type) {
      case 'pickup':
        return <ArrowCircleUpTwoTone color="inherit" />;
      case 'dropoff':
        return <ArrowDropDownCircleTwoTone color="inherit" />;
      default:
        return <AirlineStopsTwoTone color="inherit" />;
    }
  }, [task.type]);

  const getTypeColor = React.useCallback(() => {
    switch (task.type) {
      case 'pickup':
        return 'success.main';
      case 'dropoff':
        return 'warning.main';
      default:
        return 'info.main';
    }
  }, [task.type]);

  const getTypeLabel = React.useCallback(() => {
    switch (task.type) {
      case 'pickup':
        return 'Pickup';
      case 'dropoff':
        return 'Dropoff';
      default:
        return 'Stop';
    }
  }, [task.type]);

  const getTypeDisplay = React.useCallback(() => {
    const icon = getTypeIcon();
    const color = getTypeColor();
    const label = getTypeLabel();

    return (
      <Typography
        sx={[
          { color: color, display: 'flex', gap: '0.3em' },
          task.status === 'INTERUPTED' && { color: 'error.light' },
        ]}
      >
        {icon} {label}
      </Typography>
    );
  }, [getTypeIcon, getTypeColor, getTypeLabel, task.status]);

  const typeDisplay = getTypeDisplay();

  const getSCUDisplay = React.useCallback(() => {
    if (task.scu == null) return null;
    const color = task.type === 'pickup' ? 'success.main' : 'warning.main';
    const icon = task.scu > 8 ? <Scu3d /> : <Scu />;
    const isInterrupted = task.status === 'INTERUPTED';
    return (
      <Typography
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
        {task.scu} SCU{isInterrupted ? <ErrorTwoTone /> : icon}
      </Typography>
    );
  }, [task]);

  const scuDisplay = getSCUDisplay();

  const handleComplete = React.useCallback(() => {
    if (task.status === 'INTERUPTED') {
      sound.playSound('error');
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
      ...destination,
      tasks: destination.tasks.map((t) => (t.id === task.id ? updatedTask : t)),
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
  }, [task, sound, currentLoad, dispatch, destination]);

  // TODO: View the Next Stop
  // const destinations = useAppSelector(selectDestinations);
  // const nextStop
  return (
    <DigiDisplay
      sx={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {current && (
          <Checkbox
            checked={task.status === 'COMPLETED'}
            disabled={task.status === 'INTERUPTED'}
            onChange={handleComplete}
            color="success"
          />
        )}
        <Typography>{task.label}</Typography>
      </div>
      {typeDisplay}
      {scuDisplay}
      <Typography>{task.missionLabel}</Typography>
      <IconButton disabled>
        <MoveDownTwoTone color="info" sx={{ opacity: '0.4' }} />
      </IconButton>
    </DigiDisplay>
  );
};
