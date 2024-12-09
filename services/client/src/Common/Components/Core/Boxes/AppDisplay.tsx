import { logoThemeMap } from '@Common/Definitions/themes';
import { Box, styled } from '@mui/material';

export const AppDisplay = styled(Box)(({ theme }) => [
  {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flexGrow: 1,
    margin: 0,
    padding: 0,
    overflowY: 'auto',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 0,
    [theme.breakpoints.up('md')]: {
      margin: '1%',
      padding: '0.5em',
      overflowY: 'hidden',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '1em',
    },
    '&:before': {
      position: 'absolute',
      content: '""',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: -1,
    },
  },
  //VERSEOS BASE THEME
  theme.themeType === 'verseOS' && {
    '&::-webkit-scrollbar': {
      width: '5px',
      height: '5px',
    },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.action.disabled,
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '20px',
      background: theme.palette.divider,
    },
  },
  theme.themeType === 'verseOS' &&
    theme.fidelity === 'high' && {
      '&:before': {
        backgroundImage: `url(${logoThemeMap.verseOSGlow})`,
      },
    },
  theme.themeType === 'verseOS' &&
    theme.fidelity === 'medium' && {
      '&:before': {
        backgroundImage: `url(${logoThemeMap.verseOS})`,
      },
    },
  theme.themeType === 'verseOS' &&
    (theme.fidelity === 'low' || theme.fidelity === 'potato') && {
      '&:before': {
        backgroundImage: `url(${logoThemeMap.verseOSPotato})`,
      },
    },
  //PIRATEOS BASE THEME
  theme.themeType === 'pirateOS' && {
    '&::-webkit-scrollbar': {
      width: '2px',
      height: '2px',
    },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.divider,
      borderRadius: '2px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.secondary.main,
    },
  },
  theme.themeType === 'pirateOS' &&
    theme.fidelity === 'high' && {
      '&:before': {
        backgroundImage: `url(${logoThemeMap.pirateOSGlow})`,
      },
    },
  theme.themeType === 'pirateOS' &&
    theme.fidelity === 'medium' && {
      '&:before': {
        backgroundImage: `url(${logoThemeMap.pirateOS})`,
      },
    },
  theme.themeType === 'pirateOS' &&
    (theme.fidelity === 'low' || theme.fidelity === 'potato') && {
      '&:before': {
        backgroundImage: `url(${logoThemeMap.pirateOSPotato})`,
      },
    },
]);
