import { InDevOverlay } from '@Common/Components/App/InDevOverlay';
import { Box } from '@mui/material';
import { isDev } from '@Utils/isDev';
import React from 'react';

import { TuningEditor } from './TuningEditor/TuningEditor';
import { TuningExplorer } from './TuningExplorer';

export const ShipTuning: React.FC = () => {
  const dev = isDev();
  return (
    <Box
      data-testid="ShipTuning__Container"
      sx={{
        gap: '1em',
        display: 'flex',
        height: '100%',
        width: '100%',
        justifyContent: 'space-around',
      }}
    >
      {!dev && <InDevOverlay supportButton={true} />}
      <TuningEditor />
      <TuningExplorer />
    </Box>
  );
};
