import { Box, styled } from '@mui/material';

import BackdropLogo from '@/Assets/media/VerseLogos/LogoBackdrop.png?url';

export const VLViewport = styled(Box)({
  width: '100vw',
  height: 'calc(100vh - 64px)',
  overflow: 'hidden',
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
    opacity: 0.5,
  },
});
