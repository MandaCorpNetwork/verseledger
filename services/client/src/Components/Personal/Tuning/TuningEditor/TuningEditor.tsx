import GlassBox from '@Common/Components/Boxes/GlassBox';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';

import { CurrentConfig } from './CurrentConfig';
import { TuningSetup } from './TuningSetup';

export type PowerConfig = {
  active: boolean;
  totalPips: number;
  assignedPips: number;
  id: number;
};

export type TuningOption = {
  id: number;
  type:
    | 'Weapons'
    | 'Thrusters'
    | 'Shields'
    | 'LifeSupport'
    | 'Scanner'
    | 'Cooler'
    | 'QuantumDrive';
  active: boolean;
  totalPips: number;
  assignedPips: number;
  minimumPips: number;
};

export type TuningConfig = {
  powerConfig: PowerConfig[];
  tuningOptions: TuningOption[];
};

const initialTune: TuningConfig = {
  powerConfig: [
    {
      active: false,
      totalPips: 5,
      assignedPips: 0,
      id: 1,
    },
  ],
  tuningOptions: [
    {
      id: 1,
      type: 'Weapons',
      active: false,
      totalPips: 5,
      assignedPips: 0,
      minimumPips: 0,
    },
    {
      id: 1,
      type: 'Shields',
      active: false,
      totalPips: 5,
      assignedPips: 0,
      minimumPips: 0,
    },
    {
      id: 1,
      type: 'Thrusters',
      active: false,
      totalPips: 5,
      assignedPips: 0,
      minimumPips: 0,
    },
    {
      id: 1,
      type: 'Scanner',
      active: false,
      totalPips: 5,
      assignedPips: 0,
      minimumPips: 2,
    },
    {
      id: 1,
      type: 'LifeSupport',
      active: false,
      totalPips: 5,
      assignedPips: 0,
      minimumPips: 2,
    },
    {
      id: 1,
      type: 'QuantumDrive',
      active: false,
      totalPips: 5,
      assignedPips: 0,
      minimumPips: 2,
    },
    {
      id: 1,
      type: 'Cooler',
      active: false,
      totalPips: 5,
      assignedPips: 0,
      minimumPips: 2,
    },
  ],
};

export const TuningEditor: React.FC = () => {
  const [config, setConfig] = React.useState<TuningConfig>(initialTune);
  return (
    <GlassBox data-testid="ShipTuning__TuningEditor_Container" sx={{ p: '.5em' }}>
      <Typography
        data-testid="ShipTuning__TuningEditor_Title"
        variant="h5"
        sx={{ mb: '1em' }}
      >
        Tuning Editor
      </Typography>
      <CurrentConfig currentConfig={config} setConfig={setConfig} />
      <TuningSetup tuningSetup={config} setConfig={setConfig} />
      <Box
        data-testid="ShipTuning-TuningEditor__ConfigButtons_Wrapper"
        sx={{ mx: 'auto', gap: '1em', display: 'flex', my: '1em' }}
      >
        <Button variant="contained" color="success">
          Save Config
        </Button>
        <Button variant="contained" color="info">
          Export Config
        </Button>
        <Button variant="contained" color="info">
          Import Config
        </Button>
      </Box>
    </GlassBox>
  );
};
