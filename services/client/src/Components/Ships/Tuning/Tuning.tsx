import { Box } from '@mui/material';
import React from 'react';

import { TuningEditor } from './TuningEditor/TuningEditor';
import { TuningExplorer } from './TuningExplorer';

export const ShipTuning: React.FC = () => {
  return (
    <Box
      data-testid="ShipTuning__Container"
      sx={{
        gap: '1em',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        height: '100%',
        width: '100%',
        justifyContent: 'space-around',
      }}
    >
      <TuningEditor />
      <TuningExplorer />
    </Box>
  );
};
