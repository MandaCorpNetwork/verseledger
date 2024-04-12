/// <reference types="vite/client" />
import backgroundvideo from '@Assets/media/MenuPage/backgroundvideo.webm?url';
import { Box } from '@mui/material';
import React from 'react';

import FreelancerLoop from '@/Assets/media/MenuPage/FreelancerLoop.webm?url';
import JobsLoop from '@/Assets/media/MenuPage/JobsLoop.webm?url';
import MarketLoop from '@/Assets/media/MenuPage/MarketLoop.webm?url';
import OrgLoop from '@/Assets/media/MenuPage/OrgLoop.webm?url';

import { HomeNavButton } from '../../../Components/Home/HomeNavButton';

export const Home: React.FC<unknown> = () => {
  return (
    <Box marginTop={'3em'}>
      <video autoPlay loop muted id="videobg">
        <source src={backgroundvideo}></source>
      </video>
      <HomeNavButton
        title="Contract Ledger"
        to="/contract/ledger"
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
