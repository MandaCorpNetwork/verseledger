import { userBackgroundOptions } from '@CommonLegacy/Definitions/Structures/Users/UserBackgrounds';
import { Box, styled } from '@mui/material';

const selectedWatermark = userBackgroundOptions[0].waterMark;

export const UserViewport = styled(Box)({
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
  top: 0,
  left: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  zIndex: -1,
  opaticy: 0.7,
  backdropFilter: 'blur(20px)',
  '&:before': {
    content: '""',
    position: 'absolute',
    backgroundImage: `url(${selectedWatermark})`,
    backgroundSize: 'auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -2,
    opacity: 0.15,
  },
});
