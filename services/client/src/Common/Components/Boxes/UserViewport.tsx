import { userBackgroundOptions } from '@Common/Definitions/Users/UserBackground';
import { Box, styled } from '@mui/material';

const selectedUserBackground = userBackgroundOptions[0].image;
const selectedWatermark = userBackgroundOptions[0].waterMark;

export const UserViewport = styled(Box)({
  position: 'absolute',
  backgroundImage: `url(${selectedUserBackground})`,
  width: '100%',
  height: '100%',
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
