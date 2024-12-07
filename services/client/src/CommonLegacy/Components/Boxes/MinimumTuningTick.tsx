import { Divider } from '@mui/material';
import React from 'react';

import { TuningTick } from './TuningTick';

type MinimumTuningTickProps = {
  minimumTicks: number;
  isActive: boolean;
  hoveredTick: boolean;
  onClick: () => void;
  isSet: boolean;
};
export const MinimumTuningTick: React.FC<MinimumTuningTickProps> = ({
  minimumTicks,
  isActive,
  hoveredTick,
  onClick,
  isSet,
}) => {
  return (
    <TuningTick
      data-testid="ShipTuning-TuningEditor-ConfigGroup__Config__TickBox"
      onClick={onClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: `${20 * minimumTicks}px`,
        justifyContent: 'space-around',
        bgcolor: !isActive
          ? 'primary.dark'
          : hoveredTick
            ? 'secondary.main'
            : 'secondary.dark',
        borderColor:
          !isActive || hoveredTick || isSet ? 'secondary.dark' : 'secondary.main',
        '&:hover': {
          bgcolor: isActive ? 'secondary.main' : 'primary.dark',
          borderColor: isActive ? 'secondary.dark' : 'action.disabledBackground',
        },
      }}
    >
      {[...Array(minimumTicks - 1)].map((index) => (
        <Divider
          key={index}
          sx={{
            width: '70%',
            mx: 'auto',
            borderBottomWidth: '2px',
            borderColor: 'inherit',
          }}
        />
      ))}
    </TuningTick>
  );
};
