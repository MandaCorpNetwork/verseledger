import { useSoundEffect } from '@Audio/AudioManager';
import { ArrowBackIosNew } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type MobileOrTabletReturnProps = {
  opacity: number;
};

export const MobileOrTabletReturn: React.FC<MobileOrTabletReturnProps> = ({
  opacity,
}) => {
  const { playSound } = useSoundEffect();
  const navigate = useNavigate();
  return (
    <Box
      data-testid="ContractPage__Mobile_ReturnButton_Wrapper"
      sx={{
        position: 'sticky',
        bottom: 0,
        left: 0,
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
        sx={{ opacity: opacity }}
      >
        Return
      </Button>
    </Box>
  );
};
