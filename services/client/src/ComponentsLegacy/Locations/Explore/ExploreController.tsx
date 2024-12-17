import { ControlPanelBox } from '@Common/Components/Core/Boxes/ControlPanelBox';
import { Button } from '@mui/material';
import type React from 'react';

export const ExploreController: React.FC = () => {
  return (
    <ControlPanelBox
      sx={{
        display: 'flex',
        flexDirection: 'row',
        px: '1em',
        py: '.5em',
        mb: '1em',
        gap: '.5em',
      }}
    >
      <Button
        variant="contained"
        size="small"
        color="secondary"
        sx={{ fontWeight: 'bold' }}
      >
        Set Location
      </Button>
      <Button variant="contained" size="small" color="info" sx={{ fontWeight: 'bold' }}>
        Add Stop
      </Button>
      <Button
        variant="contained"
        size="small"
        color="warning"
        sx={{ fontWeight: 'bold' }}
      >
        View Logistics
      </Button>
      <Button
        variant="contained"
        size="small"
        color="warning"
        sx={{ fontWeight: 'bold' }}
      >
        View Market
      </Button>
    </ControlPanelBox>
  );
};
