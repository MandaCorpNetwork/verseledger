import { Divider } from '@mui/material';
import React from 'react';

import { TuningTick } from './TuningTick';

type MinimumTuningTickProps = {
  minimumTicks: number;
};
export const MinimumTuningTick: React.FC<MinimumTuningTickProps> = ({ minimumTicks }) => {
  return (
    <TuningTick
      data-testid="ShipTuning-TuningEditor-ConfigGroup__Config__TickBox"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: `${20 * minimumTicks}px`,
        justifyContent: 'space-around',
      }}
    >
      {[...Array(minimumTicks - 1)].map((index) => (
        <Divider
          key={index}
          sx={{ width: '70%', mx: 'auto', borderBottomWidth: '2px' }}
        />
      ))}
    </TuningTick>
  );
};
