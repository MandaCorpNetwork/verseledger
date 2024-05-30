import VLLogo from '@Assets/media/VerseLogos/VLLogo_Large.png?url';
import { Box, CircularProgress, LinearProgress, Modal } from '@mui/material';
import React from 'react';

type LoadingScreen = {
  variant: 'wheel' | 'linear';
  testid?: string;
  controlType: 'determinate' | 'indeterminate';
};

export const LoadingObject: React.FC<LoadingScreen> = ({
  variant,
  testid,
  controlType = 'indeterminate',
}) => {
  return (
    <Modal
      open={true}
      data-testid={`VLLoading__${testid}__${variant}`}
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
        }}
      >
        <img src={VLLogo} alt="VerseLedger" />
        {variant == 'wheel' && (
          <CircularProgress
            color="secondary"
            sx={{ my: '2em' }}
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
