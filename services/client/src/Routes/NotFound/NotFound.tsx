import DigiDisplay from '@Common/Components/Boxes/DigiDisplay';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useSoundEffect } from '@/AudioManager';

export const NotFoundPage: React.FC<unknown> = () => {
  const navigate = useNavigate();
  const { playSound } = useSoundEffect();
  return (
    <Box
      data-testid="NotFoundPage__Container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 64px)',
      }}
    >
      <DigiDisplay sx={{ py: '1em', px: '5em', mb: 'auto', mt: '5em' }}>
        <Typography
          variant="h1"
          sx={{
            color: 'text.secondary',
            textShadow:
              '0 0 15px rgba(24,252,252,.4), 0 0 10px rgba(252,252,252,.2), 0 0 3px rgba(0,0,0)',
          }}
        >
          404
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
          Page Not Found
        </Typography>
      </DigiDisplay>
      <Box sx={{ my: 'auto', width: '20%' }}>
        <Button
          size="large"
          variant="contained"
          fullWidth
          color="info"
          onClick={() => {
            playSound('navigate');
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
          Return
        </Button>
      </Box>
    </Box>
  );
};
