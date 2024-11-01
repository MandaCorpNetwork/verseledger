import BackdropLogo from '@Assets/media/VerseLogos/LogoBackdrop.png?url';
import { Box, styled } from '@mui/material';

export const VLViewport = styled(Box)({
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  backgroundColor: 'rgba(0,0,0,.5)',
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    backgroundImage: `url(${BackdropLogo})`,
    backgroundSize: 'cover',
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
