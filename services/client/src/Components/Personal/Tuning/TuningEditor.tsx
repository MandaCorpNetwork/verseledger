import { DigiBox } from '@Common/Components/Boxes/DigiBox';
import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
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
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import React from 'react';

import { ConfigGroup } from './ConfigGroup';

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
  const handleAddOption = React.useCallback(
    (
      type:
        | 'Power'
        | 'Weapons'
        | 'Thrusters'
        | 'Shields'
        | 'LifeSupport'
        | 'Scanner'
        | 'Cooler'
        | 'QuantumDrive',
    ) => {
      setConfig((prevConfig) => {
        if (type === 'Power') {
          const newPowerConfig: PowerConfig = {
            active: false,
            totalPips: 5,
            assignedPips: 0,
            id: prevConfig.powerConfig.length + 1,
          };
          return {
            ...prevConfig,
            powerConnfig: [...prevConfig.powerConfig, newPowerConfig],
          };
        } else {
          const optionsOfType = prevConfig.tuningOptions.filter(
            (option) => option.type === type,
          );
          const newTuningOption: TuningOption = {
            active: false,
            totalPips: 5,
            assignedPips: 0,
            minimumPips: 0,
            id: optionsOfType.length + 1,
            type,
          };
          return {
            ...prevConfig,
            tuningOptions: [...prevConfig.tuningOptions, newTuningOption],
          };
        }
      });
    },
    [setConfig],
  );
  const handleEditPips = React.useCallback(
    (outlier: 'max' | 'min', value: 'string') => {
      
    },
    [],
  );
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
      <DigiBox
        data-testid="ShipTuning-TuningEditor__ConfigSetup_Wrapper"
        sx={{ p: '1em', mt: '1em' }}
      >
        <DigiDisplay
          data-testid="ShipTuning-TuningEditor-ConfigSetup__PowerSetup_Wrapper"
          sx={{ p: '.5em', display: 'flex', flexDirection: 'column', gap: '.2em' }}
        >
          <Box
            data-testid="ShipTuning-TuningEditor-ConfigSetup-PowerSetup__TitleBar_Wrapper"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '100%',
            }}
          >
            <Typography data-testid="ShipTuning-TuningEditor-ConfigSetup-PowerSetup-TitleBar__Title">
              Power Setup
            </Typography>
            <Button
              data-testid="ShipTuning-TuningEditor-ConfigSetup-PowerSetup-TitleBar__AddSupply_Button"
              color="secondary"
              size="small"
              variant="outlined"
              onClick={() => handleAddOption('Power')}
            >
              Add Supply
            </Button>
          </Box>
          {config?.powerConfig?.map((config) => (
            <Box
              key={config.id}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                px: '.5em',
              }}
            >
              <Typography>{config.id}.</Typography>
              <TextField label="Max Pips" size="small" color="secondary" />
              <Button variant="outlined" size="small" color="error">
                Remove
              </Button>
            </Box>
          ))}
        </DigiDisplay>
        <DigiDisplay>
          <Box>
            <Typography>Components Setup</Typography>
            <Button>Add Component</Button>
          </Box>
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
