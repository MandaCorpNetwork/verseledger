import construction from '@Assets/media/Construction.webm';
import PallyLogo from '@Assets/media/MenuPage/PallyLogo.png?url';
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

import { Discord, KoFi, Patreon } from '../../Definitions/CustomIcons';

type UnderConstructionProps = {
  isOpen: boolean;
  handleClose: () => void;
};

/**
 * @deprecated
 * TODO: Move this to a VLPopup
 */
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
          <IconButton
            component="a"
            href="https://ko-fi.com/verseledger"
            target="_blank"
            rel="noopener noreferrer"
          >
            <KoFi />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.patreon.com/otterlodgestudios"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Patreon />
          </IconButton>
          <IconButton
            component="a"
            href="https://pally.gg/p/verseledger"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={PallyLogo}
              alt="Pally Logo"
              style={{ width: '28px', height: 'auto' }}
            />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.discord.gg/pVEK5rZ9WW"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Discord />
          </IconButton>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
