import { TuningGroup } from '@Common/Components/Boxes/TuningGroup';
import { TuningTick } from '@Common/Components/Boxes/TuningTick';
import { Power } from '@Common/Definitions/CustomIcons';
import { Box } from '@mui/material';
import React from 'react';

type PowerConfigProps = {
  active: boolean;
  availablePips: number;
  minimumPips?: number;
  assignedPips: number;
};

export const PowerConfigGroup: React.FC<PowerConfigProps> = ({
  active,
  availablePips,
  minimumPips = 0,
  assignedPips,
}) => {
  return (
    <Box
      data-testid="ShipTuning-TuningEditor__PowerConfigGroup_Wrapper"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.2em' }}
    >
      {Array.from({ length: availablePips }, (_, index) => {
        const reversedIndex = 14 - index;
        return <TuningTick key={index} />;
      })}
      <TuningGroup>
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
