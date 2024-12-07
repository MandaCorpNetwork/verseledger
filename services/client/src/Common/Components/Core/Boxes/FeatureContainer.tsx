import { alpha, Box, styled } from '@mui/material';
const FeatureContainer = styled(Box)(({ theme }) => [
  theme.themeType === 'verseOS' && {
    display: 'flex',
    flexDirection: 'column',
    borderTop: '2px solid',
    borderBottom: '2px solid',
    borderRadius: '10px',
    borderColor: theme.palette.secondary.main,
    height: '100%',
    backgroundColor: alpha(theme.palette.action.disabledBackground, 0.5),
    padding: '.5em',
    '&::-webkit-scrollbar': {
      width: '5px',
      height: '5px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgb(0,73,130)',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '20px',
      background: 'rgb(24,252,252)',
    },
  },
  theme.themeType === 'verseOS' &&
    theme.fidelity === 'high' && {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.3),
      backdropFilter: 'blur(10px)',
    },
  theme.themeType === 'pirateOS' && {
    display: 'flex',
    flexDirection: 'column',
    borderTop: '2px solid',
    borderBottom: '2px solid',
    borderColor: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    height: '100%',
    padding: '.5em',
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
      backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.2)} 10%, ${alpha(theme.palette.background.paper, 0.8)} 80%)`,
      backdropFilter: 'blur(5px)',
    },
  theme.themeType === 'pirateOS' &&
    theme.fidelity === 'medium' && {
      backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.2)} 10%, ${alpha(theme.palette.background.paper, 0.8)} 80%)`,
    },
]);

export default FeatureContainer;
