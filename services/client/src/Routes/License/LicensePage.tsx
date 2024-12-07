/// <reference types="vite/client" />
import '@ComponentsLegacy/Home/Home.css';

import backgroundvideo from '@Assets/media/MenuPage/backgroundvideo.webm?url';
import FeatureContainer from '@Common/Components/Core/Boxes/FeatureContainer';
import { Box } from '@mui/material';
import React from 'react';

import License from './License.mdx';

export const LicensePage: React.FC<unknown> = () => {
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
      <FeatureContainer width="100%">
        <FeatureContainer mx="20%" mb="220px" overflow="scroll">
          <License />
        </FeatureContainer>
      </FeatureContainer>
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
      />
    </Box>
  );
};
