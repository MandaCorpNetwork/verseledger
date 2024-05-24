import construction from '@Assets/media/Construction.webm';
import { Close } from '@mui/icons-material';
import {
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';

import { Discord, Patreon, Paypal } from './CustomIcons';

type UnderConstructionProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export const UnderConstruction: React.FC<UnderConstructionProps> = ({
  isOpen,
  handleClose,
}) => {
  return (
    <Dialog data-testid="UnderContruction__Dialog" open={isOpen} fullWidth>
      <Box sx={{ display: 'flex' }}>
        <DialogTitle sx={{ mx: 'auto' }}>Under Development</DialogTitle>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Box>
      <video src={construction} autoPlay loop muted />
      <Box
        sx={{
          position: 'absolute',
          zIndex: '10',
          top: '48%',
          left: '10%',
        }}
      >
        <Typography variant="body2" align="center" sx={{ fontWeight: 'bold' }}>
          Some Features are currently in development.
        </Typography>
        <Typography variant="body2" align="center" sx={{ fontWeight: 'bold' }}>
          If you would like to support the development, please view the links below!
        </Typography>
      </Box>
      <DialogActions
        sx={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'primary.dark',
            borderRadius: '20px',
            px: '.5em',
          }}
        >
          <IconButton sx={{ mx: '.2em' }}>
            <Paypal />
          </IconButton>
          <IconButton sx={{ mx: '.2em' }}>
            <Patreon />
          </IconButton>
          <IconButton sx={{ mx: '.2em' }}>
            <Discord />
          </IconButton>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
