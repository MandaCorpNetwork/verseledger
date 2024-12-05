/// <reference types="vite/client" />
import '@Components/Home/Home.css';

import backgroundvideo from '@Assets/media/MenuPage/backgroundvideo.webm?url';
import { AppDockRenderer } from '@Common/AppDockV3/AppDockV3';
import GlassBox from '@Common/Components/Boxes/GlassBox';
import { MobileDock } from '@Common/MobileDock/MobileDock';
import { SupportBar } from '@Components/Home/SupportBar';
import { Box } from '@mui/material';
import { useIsMobile } from '@Utils/isMobile';
import React from 'react';

import License from './License.mdx';

export const LicensePage: React.FC<unknown> = () => {
  const isMobile = useIsMobile();
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexGrow: 1,
        position: 'relative',
      }}
    >
      <video autoPlay loop muted id="videobg">
        <source src={backgroundvideo} />
      </video>
      <GlassBox width="100%">
        <GlassBox mx="20%" mb="220px" overflow="scroll">
          <License />
        </GlassBox>
      </GlassBox>
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
        {!isMobile && <AppDockRenderer />}
        <SupportBar />
      </Box>
      {isMobile && <MobileDock top left />}
    </Box>
  );
};
