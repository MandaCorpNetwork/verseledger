import Error from '@Assets/media/error.gif';
import { useSoundEffect } from '@Audio/AudioManager';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error = useRouteError() as { error: Error } & Error;
  const errorMessage = error?.error?.message ?? error?.message;
  //? Oops
  if (errorMessage == `Cannot destructure property 'type' of 'vnode' as it is null.`) {
    enqueueSnackbar('Encountered known error, Reloading application...', {
      variant: 'error',
      autoHideDuration: 5000,
    });
    window.location.reload();
  }
  const sound = useSoundEffect();
  React.useEffect(() => {
    sound.playSound('error');
  }, [sound]);
  return (
    <Box style={{ minHeight: '100vh', padding: '2em' }}>
      <Typography variant="h1" align="center">
        Whoops
      </Typography>
      <Typography align="center" sx={{ mb: '5em' }}>
        Sorry, an error has occured.
      </Typography>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          mt: '2em',
        }}
      >
        <Box
          sx={{
            borderTop: '2px solid',
            borderBottom: '2px solid',
            borderRadius: '10px',
            overflow: 'hidden',
            borderColor: 'primary.main',
            position: 'relative',
          }}
        >
          <img src={Error} alt="Error.gif" />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'rgba(0,20,100,.6)',
              padding: '.5em',
              borderRight: '2px solid',
              borderLeft: '2px solid',
              borderRadius: '5px',
              borderColor: 'secondary.main',
              overflow: 'hidden',
              maxWidth: '100%',
              textAlign: 'center',
            }}
          >
            <Typography variant="subtitle1">
              {errorMessage ?? 'Something went Wrong'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default ErrorPage;
