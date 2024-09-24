import { TuningGroup } from '@Common/Components/Boxes/TuningGroup';
import { TuningTick } from '@Common/Components/Boxes/TuningTick';
import { Box } from '@mui/material';
import React from 'react';

import { useSoundEffect } from '@/AudioManager';

import { TuningConfig } from './Tuning';

export const ConfigGroup: React.FC<{
  setConfig: React.Dispatch<React.SetStateAction<TuningConfig>>;
  groupKey: keyof TuningConfig;
  configKey: keyof TuningConfig;
  config: TuningConfig;
  icon: React.ReactNode;
}> = ({ setConfig, groupKey, configKey, config, icon }) => {
  const [hoveredTick, setHoveredTick] = React.useState<number | null>(null);
  const { playSound } = useSoundEffect();
  const handleMouseEnter = (index: number) => {
    setHoveredTick(index);
  };
  const handleMouseLeave = () => {
    setHoveredTick(null);
  };
  const handleConfigValue = React.useCallback(
    (index: number) => {
      setConfig((prev) => ({ ...prev, [configKey]: index }));
    },
    [setConfig, configKey],
  );
  const handleGroupToggle = React.useCallback(() => {
    setConfig((prev) => ({ ...prev, [groupKey]: !prev[groupKey] }));
    if (!config[groupKey]) {
      setConfig((prev) => ({
        ...prev,
        [configKey]: 0,
      }));
    }
  }, [groupKey, setConfig, configKey, config]);
  const isDisabled = !config[groupKey];
  return (
    <Box
      data-testid="ShipTuning-TuningEditor__ConfigGroup_Wrapper"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.2em' }}
    >
      {Array.from({ length: 15 }, (_, index) => {
        const reversedIndex = 14 - index;
        return (
          <TuningTick
            data-testid="ShipTuning-TuningEditor-ConfigGroup__Config__TickBox"
            key={index}
            onClick={() => handleConfigValue(reversedIndex + 1)}
            onMouseEnter={() => {
              handleMouseEnter(reversedIndex);
              if (!isDisabled) playSound('hover');
            }}
            onMouseLeave={handleMouseLeave}
            sx={{
              backgroundColor: isDisabled
                ? 'primary.dark'
                : reversedIndex + 1 <= (config[configKey] as number)
                  ? 'secondary.main'
                  : hoveredTick != null && reversedIndex <= hoveredTick
                    ? 'secondary.main'
                    : 'secondary.dark',
              '&:hover': {
                backgroundColor: isDisabled ? 'primary.dark' : 'secondary.main',
                borderColor: isDisabled ? 'action.disabledBackground' : 'secondary.light',
              },
            }}
          />
        );
      })}
      <TuningGroup
        onClick={handleGroupToggle}
        sx={{
          backgroundColor: config[groupKey] ? 'secondary.main' : 'secondary.dark',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          opacity: '.9',
        }}
      >
        {icon}
      </TuningGroup>
    </Box>
  );
};
