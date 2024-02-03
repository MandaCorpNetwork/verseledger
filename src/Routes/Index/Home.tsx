/// <reference types="vite/client" />
import { Box } from '@mui/material';
import React from 'react';

import FreelancerLoop from '../../Assets/media/MenuPage/FreelancerLoop.webm?url';
import JobsLoop from '../../Assets/media/MenuPage/JobsLoop.webm?url';
import MarketLoop from '../../Assets/media/MenuPage/MarketLoop.webm?url';
import OrgLoop from '../../Assets/media/MenuPage/OrgLoop.webm?url';
import { HomeNavButton } from './HomeNavButton';

export const Home: React.FC<unknown> = () => {
  return (
    <Box marginTop={'3em'}>
      <HomeNavButton
        title="Contract Ledger"
        to="/contract/splash"
        videoSource={JobsLoop}
      />
      <HomeNavButton
        title="Verse Market"
        to="/ledger/versemarket"
        videoSource={MarketLoop}
      />
      <HomeNavButton
        title="Personal Ledger"
        to="/ledger/personal"
        videoSource={FreelancerLoop}
      />
      <HomeNavButton title="Org Ledger" to="/ledger/org" videoSource={OrgLoop} />
    </Box>
  );
};
