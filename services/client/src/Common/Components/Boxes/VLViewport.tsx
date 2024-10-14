import BackdropLogo from '@Assets/media/VerseLogos/LogoBackdrop.png?url';
import { Box, styled } from '@mui/material';

export const VLViewport = styled(Box)({
  width: '100vw',
  height: 'calc(100vh - 64px)',
  overflow: 'hidden',
  backgroundColor: 'rgba(0,0,0,.5)',
  '&:before': {
    content: '""',
    position: 'absolute',
    backgroundImage: `url(${BackdropLogo})`,
    backgroundSize: 'auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    opacity: 0.6,
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -2,
    opacity: 1,
  },
});
