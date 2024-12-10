import { ComponentContainer } from '@Common/Components/Core/Boxes/ComponentContainer';
import ComponentDisplay from '@Common/Components/Core/Boxes/ComponentDisplay';
import PopupFormDisplay from '@CommonLegacy/Components/Boxes/PopupFormDisplay';
import { LocationChip } from '@CommonLegacy/Components/Chips/LocationChip';
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
    <ComponentContainer sx={{ p: '0.5em', gap: '1em' }}>
      <ComponentDisplay
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
      </ComponentDisplay>
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
    </ComponentContainer>
  );
};
