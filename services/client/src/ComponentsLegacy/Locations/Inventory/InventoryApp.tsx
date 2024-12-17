import { InDevOverlay } from '@CommonLegacy/Components/App/InDevOverlay';
import { Box } from '@mui/material';
import { isDev } from '@Utils/isDev';
import type React from 'react';

export const InventoryApp: React.FC = () => {
  const dev = isDev();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '100%',
        width: '100%',
        p: '1em',
        position: 'relative',
      }}
    >
      Inventory App
      {!dev && <InDevOverlay supportButton={true} />}
    </Box>
  );
};
