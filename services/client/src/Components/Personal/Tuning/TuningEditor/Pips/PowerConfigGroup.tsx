import { TuningGroup } from '@Common/Components/Boxes/TuningGroup';
import { TuningTick } from '@Common/Components/Boxes/TuningTick';
import { Power } from '@Common/Definitions/CustomIcons';
import { Box } from '@mui/material';
import React from 'react';
import { PowerConfig } from '../TuningEditor';

type PowerConfigProps = {
  minimumPips?: number;
  config: PowerConfig;
};

export const PowerConfigGroup: React.FC<PowerConfigProps> = ({
  minimumPips = 0,
  config,
}) => {
  return (
    <Box
      data-testid="ShipTuning-TuningEditor__PowerConfigGroup_Wrapper"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '.2em',
        justifyContent: 'flex-end',
      }}
    >
      {Array.from({ length: availablePips - minimumPips }, (_, index) => {
        const reversedIndex = 14 - index;
        return <TuningTick key={index} />;
      })}
      <TuningGroup
        sx={{
          backgroundColor: active ? 'secondary.main' : 'secondary.dark',
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
