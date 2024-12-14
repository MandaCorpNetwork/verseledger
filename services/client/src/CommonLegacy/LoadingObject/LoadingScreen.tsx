import './LoadingScreen.css';

import VLLogo from '@Assets/media/VerseLogos/VLLogo_Large.png?url';
import { Box, CircularProgress, LinearProgress, Modal } from '@mui/material';
import type React from 'react';

type LoadingScreenProps = {
  variant: 'wheel' | 'linear';
  testid?: string;
  controlType: 'determinate' | 'indeterminate';
};

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  variant,
  testid,
  controlType = 'indeterminate',
}) => {
  return (
    <Modal
      open={true}
      data-testid={`VLLoadingScreen__${testid}__${variant}`}
      sx={{
        display: 'flex',
        backdropFilter: 'blur(20px)',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          height: '100vh',
          width: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: '.75',
          border: 'none',
        }}
      >
        <img
          className="no-focus-outline"
          src={VLLogo}
          alt="VerseLedger"
          style={{ border: 'none', outline: 'none' }}
        />
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="loadingWheelColor" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(24, 252, 252)" />
              <stop offset="100%" stopColor="rgb(14, 49, 141)" />
            </linearGradient>
          </defs>
        </svg>
        {variant == 'wheel' && (
          <CircularProgress
            color="secondary"
            sx={{
              my: '2em',
              'svg circle': {
                stroke: 'url(#loadingWheelColor)',
              },
            }}
            variant={controlType}
            thickness={3.8}
            size={50}
          />
        )}
        {variant == 'linear' && (
          <LinearProgress color="secondary" sx={{ my: '2em' }} variant={controlType} />
        )}
      </Box>
    </Modal>
  );
};
