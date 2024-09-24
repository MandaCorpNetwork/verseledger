import { TuningGroup } from '@Common/Components/Boxes/TuningGroup';
import { TuningTick } from '@Common/Components/Boxes/TuningTick';
import { Box } from '@mui/material';
import React from 'react';

import { TuningConfig } from './Tuning';

export const ConfigGroup: React.FC<{
  setConfig: React.Dispatch<React.SetStateAction<TuningConfig>>;
  groupKey: keyof TuningConfig;
  configKey: keyof TuningConfig;
  config: TuningConfig;
}> = ({ setConfig, groupKey, configKey, config }) => {
  const [hoveredTick, setHoveredTick] = React.useState<number | null>(null);
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
            onMouseEnter={() => handleMouseEnter(reversedIndex)}
            onMouseLeave={handleMouseLeave}
            sx={{
              backgroundColor: isDisabled
                ? 'black'
                : reversedIndex + 1 <= (config[configKey] as number)
                  ? 'secondary.main'
                  : hoveredTick != null && reversedIndex <= hoveredTick
                    ? 'secondary.main'
                    : 'secondary.dark',
            }}
          />
        );
      })}
      <TuningGroup
        onClick={handleGroupToggle}
        sx={{
          backgroundColor: config[groupKey] ? 'secondary.main' : 'secondary.dark',
        }}
      />
    </Box>
  );
};
