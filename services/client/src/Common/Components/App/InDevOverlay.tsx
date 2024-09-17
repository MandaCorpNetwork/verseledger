import { Box, Button, Typography } from '@mui/material';
import { POPUP_SUPPORT_DEVELOPMENT } from '@Popups/Support/SupportDev';
import { useAppDispatch } from '@Redux/hooks';
import { openPopup } from '@Redux/Slices/Popups/popups.actions';
import React from 'react';

import { useSoundEffect } from '@/AudioManager';

type DevOverlayProps = {
  supportButton?: boolean;
};

export const InDevOverlay: React.FC<DevOverlayProps> = ({ supportButton }) => {
  const { playSound } = useSoundEffect();
  const dispatch = useAppDispatch();
  const handleClick = React.useCallback(() => {
    playSound('open');
    dispatch(openPopup(POPUP_SUPPORT_DEVELOPMENT));
  }, [playSound, dispatch]);
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '0',
        left: '0',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyItems: 'center',
        bgcolor: 'rgba(0,0,0,.55)',
        backdropFilter: 'blur(5px)',
        transition: 'all 0.5s ease-in-out',
        color: 'rgb(255,255,255)',
        textShadow: '0 2px 6px rgba(0,0,0)',
        '&:hover': {
          color: 'rgba(255,255,255,0)',
          bgcolor: 'rgba(0,0,0,.1)',
          backdropFilter: 'blur(0px)',
          textShadow: '0 2px 6px rgba(0,0,0,0)',
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{ textAlign: 'center', width: '100%', color: 'inherit', my: 'auto' }}
      >
        In Developement
      </Typography>
      {supportButton && (
        <Button
          variant="contained"
          sx={{
            display: 'flex',
            mb: '1em',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(14,35,141), rgba(8,22,80))',
            boxShadow: '0 5px 10px rgba(0,0,0), inset 0 2px 3px rgba(33,150,243,.2)',
            border: '2px solid rgba(24,252,252,.2)',
            textShadow: '0 3px 6px rgb(0,0,0)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              boxShadow: '0 8px 16px rgba(0,0,0,.5), inset 0 3px 5px rgba(33,150,243,.4)',
              background: 'linear-gradient(135deg, rgba(8,22,80), rgba(0,1,19))',
            },
          }}
          onClick={handleClick}
        >
          Support Development
        </Button>
      )}
    </Box>
  );
};
