import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import PopupFormDisplay from '@Common/Components/Boxes/PopupFormDisplay';
import { LocationChip } from '@Common/Components/Chips/LocationChip';
import { TextField, Typography } from '@mui/material';
import React from 'react';
import { IDestination } from 'vl-shared/src/schemas/RoutesSchema';

import { Task } from './Task';

type NextDestinationProps = {
  destination: IDestination;
  distance: string;
};

export const NextDestination: React.FC<NextDestinationProps> = ({
  destination,
  distance,
}) => {
  const tasks = destination.tasks.map((task) => task);

  const retrievingSCU = tasks.reduce(
    (sum, task) => (task.type === 'pickup' ? sum + (task.scu ?? 0) : sum),
    0,
  );

  const unloadingSCU = tasks.reduce(
    (sum, task) => (task.type === 'dropoff' ? sum + (task.scu ?? 0) : sum),
    0,
  );

  return (
    <DigiBox sx={{ p: '0.5em', gap: '1em' }}>
      <DigiDisplay
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1em',
          py: '0.2em',
        }}
      >
        <Typography
          variant="body2"
          sx={{ position: 'absolute', left: 10, color: 'info.main', fontWeight: 'bold' }}
        >
          {destination.stopNumber}.
        </Typography>
        <Typography variant="h6">Next Destination</Typography>
        <LocationChip locationId={destination.location.id} size="medium" />
      </DigiDisplay>
      <div style={{ gap: '1em', display: 'flex', padding: '0 0.5em' }}>
        <TextField size="small" label="Local Time" color="secondary" disabled />
        <TextField size="small" label="Distance" color="secondary" value={distance} />
      </div>
      <div style={{ gap: '0.5em', display: 'flex', flexDirection: 'column' }}>
        <div style={{ gap: '1em', display: 'flex', padding: '0 0.5em' }}>
          <TextField
            size="small"
            label="SCU Retrieving"
            color="secondary"
            disabled={!retrievingSCU}
          />
          <TextField
            size="small"
            label="SCU Unloading"
            color="secondary"
            disabled={!unloadingSCU}
            value={`${unloadingSCU.toLocaleString()} SCU`}
          />
        </div>
      </div>
      <PopupFormDisplay sx={{ p: '0.5em 0.2em', overflow: 'auto' }}>
        {tasks.map((task) => {
          return <Task key={task.id} task={task} destination={destination} />;
        })}
      </PopupFormDisplay>
    </DigiBox>
  );
};
