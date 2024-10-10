import GlassBox from '@Common/Components/Boxes/GlassBox';
import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import {
  Cooler,
  MedicalItems,
  Power,
  Scanner,
  Shield,
  Thruster,
  Weapons,
} from '@Common/Definitions/CustomIcons';
import { Box, Button, Divider, Typography } from '@mui/material';
import React from 'react';

import { ConfigGroup } from './ConfigGroup';
import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';

export type PowerConfig = {
  active: boolean;
  totalPips: number;
  assignedPips: number;
  id: number;
};

export type TuningOption = {
  active: boolean;
  totalPips: number;
  assignedPips: number;
  minimumPips: number;
  id: number;
  type:
    | 'Weapons'
    | 'Thrusters'
    | 'Shields'
    | 'LifeSupport'
    | 'Scanner'
    | 'Cooler'
    | 'QuantumDrive';
};

export type TuningConfig = {
  powerConfig: PowerConfig[];
  tuningOptions: TuningOption[];
};

export const TuningEditor: React.FC = () => {
  const [config, setConfig] = React.useState<TuningConfig>();
  const addOption = React.useCallback(() => {}, []);
  const removeOption = React.useCallback(() => {}, []);
  return (
    <GlassBox data-testid="ShipTuning__TuningEditor_Container" sx={{ p: '.5em' }}>
      <Typography
        data-testid="ShipTuning__TuningEditor_Title"
        variant="h5"
        sx={{ mb: '1em' }}
      >
        Tuning Editor
      </Typography>
      <GlassDisplay
        data-testid="ShipTuning-TuningEditor__CurrentConfig_Wrapper"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: '1em',
          background: 'linear-gradient(135deg, rgba(14,35,141,.5), rgba(0,1,19,.5))',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '1em',
            background: 'linear-gradient(135deg, rgba(0,0,0,.5), rgba(0,1,19,.6))',
            p: '1em',
            borderRadius: '5px',
            boxShadow: '0 4px 8px rgb(0,0,0)',
          }}
        >
          {/* <ConfigGroup
            setConfig={setConfig}
            groupKey="powerOneToggle"
            configKey="powerOne"
            config={config}
            icon={
              <Power
                sx={{
                  color: config['powerOneToggle'] ? 'text.primary' : 'secondary.light',
                }}
              />
            }
          /> */}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1em',
            ml: '1em',
            p: '1em',
          }}
        >
          {/* <ConfigGroup
            setConfig={setConfig}
            groupKey="weaponsToggle"
            configKey="weapons"
            config={config}
            icon={
              <Weapons
                sx={{
                  color: config['weaponsToggle'] ? 'text.primary' : 'secondary.light',
                }}
              />
            }
          /> */}
          <Divider orientation="vertical" sx={{ height: '90%', borderWidth: '1px' }} />
          {/* <ConfigGroup
            setConfig={setConfig}
            groupKey="scannerToggle"
            configKey="scanner"
            config={config}
            icon={
              <Scanner
                sx={{
                  color: config['scannerToggle'] ? 'text.primary' : 'secondary.light',
                }}
              />
            }
          /> */}
          <Divider orientation="vertical" sx={{ borderWidth: '1px' }} />
          {/* <ConfigGroup
            setConfig={setConfig}
            groupKey="coolerOneToggle"
            configKey="coolerOne"
            config={config}
            icon={
              <Cooler
                sx={{
                  color: config['coolerOneToggle'] ? 'text.primary' : 'secondary.light',
                }}
              />
            }
          /> */}
        </Box>
      </GlassDisplay>
      <DigiBox>
        <DigiDisplay>
          <Typography>Power Setup</Typography>
          <Button>Add </Button>
        </DigiDisplay>
        <DigiDisplay>
          <Typography>Components Setup</Typography>
        </DigiDisplay>
      </DigiBox>
      <Box
        data-testid="ShipTuning-TuningEditor__ConfigButtons_Wrapper"
        sx={{ m: 'auto', gap: '1em', display: 'flex' }}
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
