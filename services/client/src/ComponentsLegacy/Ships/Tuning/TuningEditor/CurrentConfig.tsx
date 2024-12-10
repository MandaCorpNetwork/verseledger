import { FeatureDisplay } from '@Common/Components/Core/Boxes/FeatureDisplay';
import { Box, Divider } from '@mui/material';
import React from 'react';

import { ConfigGroup } from './Pips/ConfigGroup';
import { PowerConfigGroup } from './Pips/PowerConfigGroup';
import { TuningConfig } from './TuningEditor';

type CurrentConfigProps = {
  currentConfig: TuningConfig;
  setConfig: React.Dispatch<React.SetStateAction<TuningConfig>>;
};
export const CurrentConfig: React.FC<CurrentConfigProps> = ({
  currentConfig,
  setConfig,
}) => {
  return (
    <FeatureDisplay
      data-testid="ShipTuning-TuningEditor__CurrentConfig_Wrapper"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        p: '1em',
        background: 'linear-gradient(135deg, rgba(14,35,141,.5), rgba(0,1,19,.5))',
        mb: '1em',
        overflowX: 'auto',
        width: '100%',
        minHeight: '220px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '1em',
          background: 'linear-gradient(135deg, rgba(0,0,0,.5), rgba(0,1,19,.6))',
          padding: '1em',
          borderRadius: '5px',
          boxShadow: '0 4px 8px rgb(0,0,0)',
        }}
      >
        {currentConfig.powerConfig.map((supply) => (
          <PowerConfigGroup key={supply.id} config={supply} setConfig={setConfig} />
        ))}
      </div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1em',
          ml: '1em',
          p: '1em',
        }}
      >
        {currentConfig.tuningOptions
          .filter(
            (config) =>
              config.type === 'Weapons' ||
              config.type === 'Shields' ||
              config.type === 'Thrusters',
          )
          .map((config) => (
            <ConfigGroup
              key={`${config.type}${config.id}`}
              setConfig={setConfig}
              config={config}
            />
          ))}
        <Divider orientation="vertical" sx={{ height: '90%', borderWidth: '1px' }} />
        {currentConfig.tuningOptions
          .filter(
            (config) =>
              config.type === 'Scanner' ||
              config.type === 'LifeSupport' ||
              config.type === 'QuantumDrive',
          )
          .map((config) => (
            <ConfigGroup
              key={`${config.type}${config.id}`}
              setConfig={setConfig}
              config={config}
            />
          ))}
        <Divider orientation="vertical" sx={{ borderWidth: '1px' }} />
        {currentConfig.tuningOptions
          .filter((config) => config.type === 'Cooler')
          .map((config) => (
            <ConfigGroup
              key={`${config.type}${config.id}`}
              setConfig={setConfig}
              config={config}
            />
          ))}
      </Box>
    </FeatureDisplay>
  );
};
