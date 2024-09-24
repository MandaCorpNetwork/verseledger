import GlassBox from '@Common/Components/Boxes/GlassBox';
import { GlassDisplay } from '@Common/Components/Boxes/GlassDisplay';
import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

import { ConfigGroup } from './ConfigGroup';

export type TuningConfig = {
  powerOne: number;
  powerOneToggle: boolean;
  powerTwo: number;
  powerTwoToggle: boolean;
  weapons: number;
  weaponsToggle: boolean;
  thrusters: number;
  thrustersToggle: boolean;
  shields: number;
  shieldsToggle: boolean;
  lifeSupport: number;
  lifeSupportToggle: boolean;
  scanner: number;
  scannerToggle: boolean;
  coolerOne: number;
  coolerOneToggle: boolean;
  coolerTwo: number;
  coolerTwoToggle: boolean;
};

export const ShipTuning: React.FC = () => {
  const [config, setConfig] = React.useState<TuningConfig>({
    powerOne: 0,
    powerOneToggle: false,
    powerTwo: 0,
    powerTwoToggle: false,
    weapons: 0,
    weaponsToggle: false,
    thrusters: 0,
    thrustersToggle: false,
    shields: 0,
    shieldsToggle: false,
    lifeSupport: 0,
    lifeSupportToggle: false,
    scanner: 0,
    scannerToggle: false,
    coolerOne: 0,
    coolerOneToggle: false,
    coolerTwo: 0,
    coolerTwoToggle: false,
  });
  return (
    <Box
      data-testid="ShipTuning__Container"
      sx={{ gap: '1em', display: 'flex', height: '100%', width: '100%' }}
    >
      <GlassBox data-testid="ShipTuning__TuningEditor_Container">
        <Typography data-testid="ShipTuning__TuningEditor_Title" variant="h6">
          Tuning Editor
        </Typography>
        <GlassDisplay data-testid="ShipTuning-TuningEditor__CurrentConfig_Wrapper">
          <Box sx={{ display: 'flex', gap: '.5em' }}>
            <ConfigGroup
              setConfig={setConfig}
              groupKey="powerOneToggle"
              configKey="powerOne"
              config={config}
            />
          </Box>
          <Box>
            <Divider orientation="vertical" />
            <Divider orientation="vertical" />
          </Box>
        </GlassDisplay>
      </GlassBox>
    </Box>
  );
};
