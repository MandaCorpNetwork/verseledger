import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import PopupFormDisplay from '@Common/Components/Boxes/PopupFormDisplay';
import { LocationChip } from '@Common/Components/Chips/LocationChip';
import { Scu3d } from '@Common/Definitions/CustomIcons';
import { LinearProgress, TextField, Typography } from '@mui/material';
import { useAppSelector } from '@Redux/hooks';
import { currentRouteLoad } from '@Redux/Slices/Routes/routes.selectors';
import React from 'react';
import { IDestination } from 'vl-shared/src/schemas/RoutesSchema';

import { Task } from './Task';

type CurrentDestinationProps = {
  destination: IDestination;
};

export const CurrentDestination: React.FC<CurrentDestinationProps> = ({
  destination,
}) => {
  const currentLoad = useAppSelector(currentRouteLoad);
  const tasks = destination.tasks.map((task) => task);

  const getDepartureLoad = React.useCallback(() => {
    let load = currentLoad;
    for (const task of tasks) {
      if (task.status !== 'PENDING' || task.scu == null) continue;
      if (task.type === 'pickup') {
        load += task.scu;
      } else if (task.type === 'dropoff') {
        load -= task.scu;
      }
    }
    return load;
  }, [tasks, currentLoad]);
  const departureLoad = getDepartureLoad();

  const getCompletion = React.useCallback(() => {
    const totalSCU = tasks.reduce((sum, task) => sum + (task.scu ?? 0), 0);
    const totalTaskCount = tasks.length;

    let completedSCUWeight = 0;
    let completedTaskWeight = 0;

    tasks.forEach((task) => {
      if (task.status === 'COMPLETED') {
        if (task.scu) {
          completedSCUWeight += (task.scu / totalSCU) * 100;
        } else {
          completedTaskWeight += 100 / totalTaskCount;
        }
      }
    });

    const totalCompletion = completedSCUWeight + completedTaskWeight;
    return totalCompletion;
  }, [tasks]);

  const completion = getCompletion();

  return (
    <DigiBox sx={{ p: '0.5em', maxHeight: '45%', gap: '1em' }}>
      <DigiDisplay
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1em',
          py: '0.2em',
        }}
      >
        <Typography variant="h6">Current Destination</Typography>
        <LocationChip locationId={destination.location.id} size="medium" />
      </DigiDisplay>
      <Typography
        variant="subtitle2"
        sx={{
          display: 'inline-flex',
          gap: '0.5em',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Current Load:
        <Typography sx={{ fontWeight: 'bold', color: 'warning.main' }}>
          {currentLoad} SCU
        </Typography>
      </Typography>
      <div style={{ gap: '1em', display: 'flex', padding: '0 0.5em' }}>
        <TextField size="small" label="Local Time" color="secondary" disabled />
        <TextField
          size="small"
          label="Departure Load"
          color="secondary"
          value={`${departureLoad.toLocaleString()} SCU`}
          slotProps={{
            input: {
              endAdornment: <Scu3d />,
            },
          }}
        />
      </div>
      <div>
        <LinearProgress variant="determinate" value={completion} />
      </div>
      <PopupFormDisplay sx={{ p: '0.5em 0.2em', overflow: 'auto' }}>
        {tasks.map((task) => {
          return <Task key={task.id} task={task} destination={destination} current />;
        })}
      </PopupFormDisplay>
    </DigiBox>
  );
};
