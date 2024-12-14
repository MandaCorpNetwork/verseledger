import { ComponentContainer } from '@Common/Components/Core/Boxes/ComponentContainer';
import ComponentDisplay from '@Common/Components/Core/Boxes/ComponentDisplay';
import { LocationChip } from '@CommonLegacy/Components/Chips/LocationChip';
import { TextField, Typography } from '@mui/material';
import type React from 'react';
import type { IDestination } from 'vl-shared/src/schemas/RoutesSchema';

type CheckpointDestinationProps = {
  destination: IDestination;
  distance: string;
};

export const CheckpointDestination: React.FC<CheckpointDestinationProps> = ({
  destination,
  distance,
}) => {
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
        <Typography variant="h6">Next Checkpoint</Typography>
        <LocationChip locationId={destination.location.id} size="medium" />
      </ComponentDisplay>
      <div style={{ gap: '1em', display: 'flex', padding: '0 0.5em' }}>
        <TextField size="small" label="Local Time" color="secondary" disabled />
        <TextField size="small" label="Distance" color="secondary" value={distance} />
      </div>
    </ComponentContainer>
  );
};
