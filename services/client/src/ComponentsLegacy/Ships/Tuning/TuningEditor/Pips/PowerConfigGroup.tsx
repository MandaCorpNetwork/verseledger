import { TuningGroup } from '@CommonLegacy/Components/Boxes/TuningGroup';
import { TuningTick } from '@CommonLegacy/Components/Boxes/TuningTick';
import { Power } from '@CommonLegacy/DefinitionsLegacy/CustomIcons';
import { Box } from '@mui/material';
import React from 'react';

import type { PowerConfig, TuningConfig } from '../TuningEditor';

type PowerConfigProps = {
  minimumPips?: number;
  config: PowerConfig;
  setConfig: React.Dispatch<React.SetStateAction<TuningConfig>>;
};

export const PowerConfigGroup: React.FC<PowerConfigProps> = ({
  minimumPips = 0,
  config,
  setConfig,
}) => {
  const isActive = config.active;

  const handleGroupToggle = React.useCallback(() => {
    setConfig((prev) => ({
      ...prev,
      powerConfig: prev.powerConfig.map((option) => {
        if (option.id === config.id) {
          return {
            ...option,
            active: !option.active,
          };
        }
        return option;
      }),
    }));
  }, [setConfig, config]);
  return (
    <Box
      data-testid="ShipTuning-TuningEditor__PowerConfigGroup_Wrapper"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '.5em',
        justifyContent: 'flex-end',
      }}
    >
      <Box
        data-testid={`ShipTuning-TuningEditor__ConfigGroup_Wrapper`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '.2em',
          flexWrap: 'wrap-reverse',
          height: '90%',
          justifyContent: 'flex-end',
        }}
      >
        {Array.from({ length: config.totalPips - minimumPips }, (_, index) => {
          const reversedIndex = config.totalPips - minimumPips - index;
          return (
            <TuningTick
              key={index}
              data-testid={`ShipTuning-TuningEditor__ConfigGroup_Wrapper`}
              sx={{
                bgcolor: !isActive
                  ? 'primary.dark'
                  : reversedIndex + 1 <= config.assignedPips
                    ? 'secondary.main'
                    : 'secondary.dark',
              }}
            />
          );
        })}
      </Box>
      <TuningGroup
        onClick={handleGroupToggle}
        sx={{
          bgcolor: isActive ? 'secondary.main' : 'secondary.dark',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          opacity: '.9',
        }}
      >
        <Power />
      </TuningGroup>
    </Box>
  );
};

/*
AutoAssign the Number of Pips being Assigned
Over Assigned sets top Two to red
Hover over Tuning Group to specify assigned
*/
