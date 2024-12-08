import { alpha, Box, styled } from '@mui/material';

export const ComponentContainer = styled(Box)(({ theme }) => [
  theme.themeType === 'verseOS' && {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    borderTop: '2px solid',
    borderBottom: '2px solid',
    borderRadius: '5px',
    borderColor: theme.palette.primary.main,
    borderLeft: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
    borderRight: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
    backgroundColor: alpha(theme.palette.divider, 0.1),
    position: 'relative',
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
      // boxShadow:
    //   '0 1px 2px rgba(33,150,243,.4), 0 2px 4px rgba(33,150,243,.3), 0 4px 8px rgba(33,150,243,.2), 0 8px 16px rgba(33,150,243,.1), 0 16px 32px rgba(0,9,16,.05), inset 0 1px 2px rgba(0,9,16,.05), inset 0 2px 4px rgba(0,9,16,.05), inset 0 4px 8px rgba(0,9,16,.05), inset 0 8px 16px rgba(0,9,16,.05), inset 0 16px 32px rgba(0,9,16,.05)',
      boxShadow: `0 1px 3px ${alpha()}`,
      backdropFilter: 'blur(10px)',
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.5)} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
        opacity: 0.6,
        backdropFilter: 'blur(10px)',
        zIndex: -1,
        backgroundImage: `linear-gradient(transparent 45%, ${alpha(theme.palette.primary.main, 0.45)} 5%)`,
        backgroundSize: '100% 2px',
      },
    },
]);
