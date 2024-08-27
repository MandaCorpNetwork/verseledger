import { ArrowBackIosNew } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useSoundEffect } from '@/AudioManager';

export const DesktopReturn: React.FC<unknown> = () => {
  const { playSound } = useSoundEffect();
  const navigate = useNavigate();
  return (
    <Box
      data-testid="ContractPage__Desktop_ReturnButton_Wrapper"
      sx={{
        position: 'absolute',
        top: 10,
        left: 10,
        transition: 'opacity 0.5s ease-in-out',
        zIndex: '50',
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          playSound('navigate');
          navigate(-1);
        }}
        startIcon={<ArrowBackIosNew />}
      >
        Return
      </Button>
    </Box>
  );
};
