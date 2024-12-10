import { alpha, Box, styled } from '@mui/material';

export const ComponentContainer = styled(Box)(({ theme }) => [
  //VERSEOS BASE THEME
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
  //VERSEOS HIGH FIDELITY
  theme.themeType === 'verseOS' &&
    theme.fidelity === 'high' && {
      boxShadow: `0 1px 3px ${alpha(theme.palette.primary.main, 0.4)}, 0 4px 6px ${alpha(theme.palette.primary.main, 0.3)}, 0 10px 20px ${alpha(theme.palette.primary.main, 0.2)}, 0 2px 4px rgba(0,0,0,0.6), inset 0 1px 2px ${alpha(theme.palette.divider, 0.05)}`,
      backdropFilter: 'blur(10px)',
      zIndex: 1,
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
        zIndex: -2,
        backgroundImage: `linear-gradient(transparent 45%, ${alpha(theme.palette.primary.main, 0.45)} 5%)`,
        backgroundSize: '100% 4px',
      },
    },
  theme.themeType === 'verseOS' &&
    theme.fidelity === 'high' &&
    theme.animations === 'high' && {
      '@keyframes riseLines': {
        from: {
          backgroundPosition: '0% 100%',
        },
        to: {
          backgroundPosition: '0% 0%',
        },
      },
      '@keyframes pulseShadow': {
        '0%': {
          boxShadow: `0 2px 6px ${alpha(theme.palette.primary.main, 0.4)}, 0 6px 12px ${alpha(theme.palette.primary.main, 0.3)}, 0 16px 32px ${alpha(theme.palette.primary.main, 0.2)}, 0 4px 8px rgb(0,0,0,0.6), inset 0 1px 2px ${alpha(theme.palette.divider, 0.05)}`,
        },
        '50%': {
          boxShadow: `0 3px 8px ${alpha(theme.palette.primary.main, 0.5)}, 0 8px 16px ${alpha(theme.palette.primary.main, 0.4)}, 0 20px 40px ${alpha(theme.palette.primary.main, 0.3)}, 0 5px 10px rgb(0,0,0,0.7), inset 0 2px 4px ${alpha(theme.palette.divider, 0.1)}`,
        },
        '100%': {
          boxShadow: `0 2px 6px ${alpha(theme.palette.primary.main, 0.4)}, 0 6px 12px ${alpha(theme.palette.primary.main, 0.3)}, 0 16px 32px ${alpha(theme.palette.primary.main, 0.2)}, 0 4px 8px rgb(0,0,0,0.6), inset 0 1px 2px ${alpha(theme.palette.divider, 0.05)}`,
        },
      },
      '&:before': {
        backgroundRepeat: 'repeat',
        animation: 'riseLines 5s linear infinite',
      },
      '&:hover': {
        animation: 'pulseShadow 5s infinite ease-in-out',
      },
    },
  theme.themeType === 'verseOS' &&
    theme.fidelity === 'high' &&
    theme.animations === 'medium' && {
      transition: 'box-shadow 0.3s ease-in-out',
      boxShadow: `0 3px 8px ${alpha(theme.palette.primary.main, 0.5)}, 0 8px 16px ${alpha(theme.palette.primary.main, 0.4)}, 0 20px 40px ${alpha(theme.palette.primary.main, 0.3)}, 0 5px 10px rgb(0,0,0,0.7), inset 0 2px 4px ${alpha(theme.palette.divider, 0.1)}`,
    },
  //VERSEOS MEDIUM FIDELITY
  theme.themeType === 'verseOS' &&
    theme.fidelity === 'medium' && {
      boxShadow: `0 1px 3px ${alpha(theme.palette.primary.main, 0.4)}, 0 4px 6px ${alpha(theme.palette.primary.main, 0.3)}, 0 10px 20px ${alpha(theme.palette.primary.main, 0.2)}, 0 2px 4px rgba(0,0,0,0.6), inset 0 1px 2px ${alpha(theme.palette.divider, 0.05)}`,
    },
  theme.themeType === 'verseOS' &&
    theme.fidelity === 'medium' &&
    theme.animations === 'high' && {
      transition: 'box-shadow 0.3s ease-in-out',
      boxShadow: `0 3px 8px ${alpha(theme.palette.primary.main, 0.5)}, 0 8px 16px ${alpha(theme.palette.primary.main, 0.4)}, 0 20px 40px ${alpha(theme.palette.primary.main, 0.3)}, 0 5px 10px rgb(0,0,0,0.7), inset 0 2px 4px ${alpha(theme.palette.divider, 0.1)}`,
    },
  theme.themeType === 'verseOS' &&
    theme.fidelity === 'medium' &&
    theme.animations === 'medium' && {
      transition: 'box-shadow 0.3s ease-in-out',
      boxShadow:
        '0 2px 3px rgb(0,0,0,0.4), 0 4px 6px rgb(0,0,0,0.3), 0 10px 20px rgb(0,0,0,0.2)',
      '&:hover': {
        boxShadow:
          '0 3px 6px rgb(0,0,0,0.6), 0 8px 12px rgb(0,0,0,0.5), 0 15px 35px rgb(0,0,0,0.4)',
      },
    },
  //PIRATEOS BASE THEME
  theme.themeType === 'pirateOS' && {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: alpha(theme.palette.divider, 0.7),
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
  //PIRATEOS HIGH FIDELITY
  theme.themeType === 'pirateOS' &&
    theme.fidelity === 'high' && {
      backdropFilter: 'blur(10px)',
      boxShadow: `0 4px 6px ${alpha(theme.palette.background.default, 0.3)}, 0 10px 20px ${alpha(theme.palette.background.default, 0.2)}, 0 2px 4px ${alpha(theme.palette.background.paper, 0.2)}`,
      border: `1px solid ${theme.palette.background.paper}`,
      '&:before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at right, ${alpha(theme.palette.primary.dark, 0.2)} 10%, transparent 70%)`,
        pointerEvents: 'none',
        transition: 'background 0.3s ease-in-out',
      },
    },
  theme.themeType === 'pirateOS' &&
    theme.fidelity === 'high' &&
    theme.animations === 'high' && {
      '@keyframes pulseRadial': {
        '0%': {
          opacity: 0.6,
        },
        '50%': {
          opacity: 1,
        },
        '100%': {
          opacity: 0.6,
        },
      },
      transition: 'box-shadow 0.3s ease',
      '&:hover': {
        boxShadow: `0 8px 12px ${alpha(theme.palette.background.default, 0.5)}, 0 20px 40px ${alpha(theme.palette.background.default, 0.4)}, 0 4px 8px ${alpha(theme.palette.background.paper, 0.3)}`,
        '&:before': {
          background: `radial-gradient(circle at right, ${alpha(theme.palette.primary.dark, 0.4)} 10%, transparent 70%)`,
          animation: 'pulseRadial 3s infinite ease-in-out',
        },
      },
    },
  //PIRATEOS MEDIUM FIDELITY
  theme.themeType === 'pirateOS' &&
    theme.fidelity === 'medium' && {
      boxShadow: `0 4px 6px ${alpha(theme.palette.background.default, 0.3)}, 0 10px 20px ${alpha(theme.palette.background.default, 0.2)}, 0 2px 4px ${alpha(theme.palette.background.paper, 0.2)}`,
      border: `1px solid ${theme.palette.background.paper}`,
    },
  theme.themeType === 'pirateOS' &&
    theme.fidelity === 'medium' &&
    theme.animations === 'high' && {
      transition: 'box-shadow 0.3s ease',
      '&:hover': {
        boxShadow: `0 8px 12px ${alpha(theme.palette.background.default, 0.5)}, 0 20px 40px ${alpha(theme.palette.background.default, 0.4)}, 0 4px 8px ${alpha(theme.palette.background.paper, 0.3)}`,
      },
    },
  //PIRATEOS LOW FIDELITY
  theme.themeType === 'pirateOS' &&
    theme.fidelity === 'low' && {
      border: `1px solid ${theme.palette.background.paper}`,
    },
]);
