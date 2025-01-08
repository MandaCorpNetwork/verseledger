import { Box } from '@mui/material';
import type React from 'react';

import { ItemBrowser } from './ItemBrowser/ItemBrowser';
import { ItemDisplay } from './ItemDisplay/ItemDisplay';

export const Marketplace: React.FC = () => {
  return (
    <Box
      data-testid="VerseMarket__Marketplace__Container"
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        pr: '1em',
      }}
    >
      <ItemBrowser />
      <ItemDisplay />
    </Box>
  );
};
