import backgroundvideo from '@Assets/media/NotFoundVideo.webm';
import ComponentDisplay from '@Common/Components/Core/Boxes/ComponentDisplay';
import { Box, Button, Typography } from '@mui/material';
import type React from 'react';
import { useNavigate, useRouteError } from 'react-router';

const ErrorPage: React.FC<unknown> = () => {
  const navigate = useNavigate();
  const error = useRouteError() as { error: Error } & Error;

  const errorMessage = error?.error?.message ?? error?.message;
  return (
    <Box
      data-testid="ErrorPage__Container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 64px)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <video
        autoPlay
        loop
        muted
        id="videobg"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'scale(1.3)',
          transformOrigin: 'center center',
        }}
      >
        <source src={backgroundvideo} />
      </video>
      <ComponentDisplay sx={{ py: '1em', px: '5em', mt: '5em' }}>
        <Typography
          variant="h1"
          sx={{
            color: 'text.secondary',
            textShadow:
              '0 0 15px rgba(24,252,252,.4), 0 0 10px rgba(252,252,252,.2), 0 0 3px rgba(0,0,0)',
          }}
        >
          Whoops
        </Typography>
        <Typography
          variant="h2"
          sx={{
            color: 'text.secondary',
            textShadow:
              '0 0 15px rgba(24,252,252,.4), 0 0 10px rgba(252,252,252,.2), 0 0 3px rgba(0,0,0)',
            letterSpacing: '3px',
          }}
        >
          Something Went Wrong
        </Typography>
      </ComponentDisplay>
      <ComponentDisplay sx={{ py: '1em', px: '5em', mb: 'auto', mt: '5em' }}>
        <Typography variant="body1">{errorMessage}</Typography>
      </ComponentDisplay>
      <Box sx={{ my: 'auto', width: '20%' }}>
        <Button
          size="large"
          variant="contained"
          fullWidth
          color="info"
          onClick={() => {
            navigate(-1);
          }}
          sx={{
            py: '15px',
            fontSize: '1.2em',
            fontWeight: 'bold',
            letterSpacing: '5px',
            boxShadow:
              '0 4px 8px rgba(0,1,19,.7), 0 6px 12px rgba(0,1,19,.6), inset 0 4px 8px rgba(0,1,19,.8), inset 0 -4px 8px rgba(0,1,19,.4)',
            transition: 'all .1s ease-in-out',
            '&:active': {
              transform: 'translateY(4px)',
            },
          }}
        >
          Return Home
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorPage;
