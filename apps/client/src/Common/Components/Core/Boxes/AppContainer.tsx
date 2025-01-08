import { Box, styled, type SxProps, type Theme } from '@mui/material';
import { generateStyles } from '@Utils/GenerateStyles';

const defaultStyles: SxProps<Theme> = (theme: Theme) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  flexGrow: 1,
  margin: 0,
  padding: 0,
  overflowY: 'auto',
  justifyContent: 'center',
  position: 'relative',
  zIndex: 0,
  [theme.breakpoints.up('md')]: {
    padding: '0.5em',
    overflowY: 'hidden',
  },
  [theme.breakpoints.up('lg')]: {
    padding: '1em',
  },
  '&::before': {
    position: 'absolute',
    content: '""',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,
    idth: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

export const AppDisplay = styled(Box)(({ theme }) => ({
  ...generateStyles(theme, defaultStyles(theme), 'AppDisplay'),
}));
