/// <reference types="vite/client" />
import '@Components/Home/Home.css';

import backgroundvideo from '@Assets/media/MenuPage/backgroundvideo.webm?url';
import { AppDock } from '@Common/AppDock/AppDock';
import { MobileDock } from '@Common/MobileDock/MobileDock';
import { SupportBar } from '@Components/Home/SupportBar';
import { Box } from '@mui/material';
import { useIsMobile } from '@Utils/isMobile';
import React from 'react';

export const Home: React.FC<unknown> = () => {
  const isMobile = useIsMobile();
  return (
    <Box
      sx={{
        width: '100vh',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexGrow: 1,
      }}
    >
      <video autoPlay loop muted id="videobg">
        <source src={backgroundvideo} />
      </video>
      <Box
        sx={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          left: '50%',
          transform: 'translateX(-50%)',
          gap: '.5em',
          height: '100%',
          pb: '5px',
        }}
      >
        {!isMobile && <AppDock />}
        <SupportBar />
      </Box>
      {isMobile && <MobileDock top left />}
    </Box>
  );
};
