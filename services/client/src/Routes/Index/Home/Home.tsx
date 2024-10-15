/// <reference types="vite/client" />
import backgroundvideo from '@Assets/media/MenuPage/backgroundvideo.webm?url';
import { AppDock } from '@Common/Components/App/AppDock/AppDock';
import { SupportBar } from '@Components/Home/SupportBar';
import { Box } from '@mui/material';
import React from 'react';

export const Home: React.FC<unknown> = () => {
  return (
    <Box marginTop={{ xs: '1em', s: '3em' }}>
      <video autoPlay loop muted id="videobg">
        <source src={backgroundvideo}></source>
      </video>
      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          left: '50%',
          transform: 'translateX(-50%)',
          gap: '.5em',
        }}
      >
        <AppDock />
        <SupportBar />
      </Box>
    </Box>
  );
};
