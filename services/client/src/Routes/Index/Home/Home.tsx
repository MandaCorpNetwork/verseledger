/// <reference types="vite/client" />
import backgroundvideo from '@Assets/media/MenuPage/backgroundvideo.webm?url';
import { Box, IconButton } from '@mui/material';
import React from 'react';

import FreelancerLoop from '@/Assets/media/MenuPage/FreelancerLoop.webm?url';
import JobsLoop from '@/Assets/media/MenuPage/JobsLoop.webm?url';
import MarketLoop from '@/Assets/media/MenuPage/MarketLoop.webm?url';
import OrgLoop from '@/Assets/media/MenuPage/OrgLoop.webm?url';
import VerseNews from '@/Assets/media/MenuPage/VerseNews.webm?url';
import { Discord, Patreon, Paypal } from '@Common/Definitions/CustomIcons';

import { HomeNavButton } from '../../../Components/Home/HomeNavButton';

export const Home: React.FC<unknown> = () => {
  return (
    <Box marginTop={'3em'}>
      <video autoPlay loop muted id="videobg">
        <source src={backgroundvideo}></source>
      </video>
      <HomeNavButton
        title="Contract Ledger"
        to="/ledger/contract"
        videoSource={JobsLoop}
      />
      <HomeNavButton title="Verse Market" inDev={true} videoSource={MarketLoop} />
      <HomeNavButton
        title="Personal Ledger"
        to="/ledger/personal"
        videoSource={FreelancerLoop}
      />
      <HomeNavButton title="Org Ledger" inDev={true} videoSource={OrgLoop} />
      <HomeNavButton title="Verse News" inDev={true} videoSource={VerseNews} />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',
          left: '45%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            backgroundColor: 'primary.dark',
            borderRadius: '20px',
            px: '.5em',
          }}
        >
          <IconButton>
            <Paypal fontSize="large" />
          </IconButton>
          <IconButton>
            <Patreon fontSize="large" />
          </IconButton>
          <IconButton>
            <Discord fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
