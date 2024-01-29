import { Box } from '@mui/material';
import React from 'react';

import { HomeNavButton } from './HomeNavButton';

export const Home: React.FC<unknown> = () => {
  return (
    <Box marginTop={'3em'}>
      <HomeNavButton title="Contract Ledger" to="/ledger/contract" />
      <HomeNavButton title="Personal Ledger" to="/ledger/personal" />
      <HomeNavButton title="Org Ledger" to="/ledger/org" />
    </Box>
  );
};
