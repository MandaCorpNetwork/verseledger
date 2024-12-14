import { useSoundEffect } from '@Audio/AudioManager';
import { MinimumTuningTick } from '@CommonLegacy/Components/Boxes/MinimumTuningTick';
import { TuningGroup } from '@CommonLegacy/Components/Boxes/TuningGroup';
import { TuningTick } from '@CommonLegacy/Components/Boxes/TuningTick';
import {
  Cooler,
  MedicalItems,
  Scanner,
  Shield,
  Thruster,
  Weapons,
} from '@CommonLegacy/DefinitionsLegacy/CustomIcons';
import { QuestionMark } from '@mui/icons-material';
import { Box } from '@mui/material';
import React from 'react';

import type { TuningConfig, TuningOption } from '../TuningEditor';

export const ConfigGroup: React.FC<{
  setConfig: React.Dispatch<React.SetStateAction<TuningConfig>>;
  config: TuningOption;
}> = ({ setConfig, config }) => {
  const [hoveredTick, setHoveredTick] = React.useState<number | null>(null);
  const sound = useSoundEffect();
  const isActive = config.active;

  const handleMouseEnter = React.useCallback(
    (index: number) => {
      setHoveredTick(index);
    },
    [setHoveredTick],
  );

  const handleMouseLeave = React.useCallback(() => {
    setHoveredTick(null);
  }, [setHoveredTick]);

  const handleConfigValue = React.useCallback(
    (index: number) => {
      if (isActive) return sound.playSound('denied');
      setConfig((prev) => ({
        ...prev,
        tuningOptions: prev.tuningOptions.map((option) => {
          if (option.id === config.id && config.type == option.type) {
            return {
              ...option,
              assignedPips: index,
            };
          }
          return option;
        }),
      }));
    },
    [setConfig, config, sound, isActive],
  );
  const handleGroupToggle = React.useCallback(() => {
    setConfig((prev) => ({
      ...prev,
      tuningOptions: prev.tuningOptions.map((option) => {
        if (option.id === config.id && option.type === config.type) {
          return {
            ...option,
            active: !option.active,
          };
        }
        return option;
      }),
    }));
  }, [setConfig, config]);

  const renderIcon = React.useCallback((type: string) => {
    switch (type) {
      case 'Weapons':
        return <Weapons />;
      case 'Thrusters':
        return <Thruster />;
      case 'Shields':
        return <Shield />;
      case 'LifeSupport':
        return <MedicalItems />;
      case 'Scanner':
        return <Scanner />;
      case 'Cooler':
        return <Cooler />;
      case 'QuantumDrive':
        return <Thruster />;
      default:
        return <QuestionMark />;
    }
  }, []);
  return (
    <Box
      data-testid={`ShipTuning-TuningEditor__ConfigGroup_Wrapper`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '.5em',
        minWidth: 'fit-content',
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
        {Array.from({ length: config.totalPips - config.minimumPips }, (_, index) => {
          const reversedIndex = config.totalPips - config.minimumPips - 1 - index;
          return (
            <TuningTick
              data-testid={`ShipTuning-TuningEditor__ConfigGroup_Wrapper`}
              key={index}
              onClick={() => handleConfigValue(reversedIndex + 1 + config.minimumPips)}
              onMouseEnter={() => handleMouseEnter(reversedIndex)}
              onMouseLeave={handleMouseLeave}
              sx={{
                bgcolor: !isActive
                  ? 'primary.dark'
                  : reversedIndex + 1 <= config.assignedPips
                    ? 'secondary.main'
                    : hoveredTick != null && reversedIndex <= hoveredTick
                      ? 'secondary.main'
                      : 'secondary.dark',
                '&:hover': {
                  bgcolor: isActive ? 'secondary.main' : 'primary.dark',
                  borderColor: isActive ? 'secondary.light' : 'action.disabledBackground',
                },
              }}
            />
          );
        })}
        {config.minimumPips > 0 && (
          <MinimumTuningTick
            minimumTicks={config.minimumPips}
            isActive={isActive}
            hoveredTick={hoveredTick != null}
            onClick={() => handleConfigValue(config.minimumPips)}
            isSet={config.minimumPips === config.assignedPips}
          />
        )}
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
        {renderIcon(config.type)}
      </TuningGroup>
    </Box>
  );
};
