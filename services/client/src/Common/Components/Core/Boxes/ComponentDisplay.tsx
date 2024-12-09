import { alpha, Box, styled } from '@mui/material';

export const ComponentDisplay = styled(Box)(({ theme }) => [
  {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  //VERSEOS BASE THEME
  theme.themeType === 'verseOS' && {
    backgroundColor: alpha(theme.palette.primary.main, 0.6),
    borderRadius: '5px',
    borderTop: '1px solid',
    borderBottom: '1px solid',
    borderColor: theme.palette.primary.light,
    borderLeft: `1px solid ${theme.palette.primary.main}`,
    borderRight: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.text.secondary,
    transition: 'color 0.2s ease-in-out',
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
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  //VERSEOS HIGH FIDELITY
  theme.themeType === 'verseOS' &&
    theme.fidelity === 'high' && {
      boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.4)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.3)}, 0 6px 12px ${alpha(theme.palette.background.paper, 0.6)}, 0 10px 20px ${alpha(theme.palette.background.default, 0.2)}, inset 0 1px 2px ${alpha(theme.palette.primary.main, 0.3)}, inset 0 -1px 2px ${alpha(theme.palette.background.default, 0.2)}`,
      backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.4)} 0%, ${alpha(theme.palette.primary.dark, 0.6)} 100%)`,
      borderColor: alpha(theme.palette.primary.light, 0.3),
      borderLeft: `1px solid ${theme.palette.primary.main}`,
      borderRight: `1px solid ${theme.palette.primary.main}`,
    },
  theme.themeType === 'verseOS' &&
    theme.fidelity === 'high' &&
    (theme.animations === 'high' || theme.animations === 'medium') && {
      transition:
        'box-shadow 0.3s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out',
      '&:hover': {
        boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.5)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.4)}, 0 12px 24px ${alpha(theme.palette.background.paper, 0.6)}, 0 15px 35px ${alpha(theme.palette.background.default, 0.4)}, inset 0 2px 4px ${alpha(theme.palette.primary.main, 0.5)}, inset 0 -2px 4px ${alpha(theme.palette.background.default, 0.4)}`,
        borderColor: alpha(theme.palette.primary.light, 0.6),
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        borderRight: `1px solid ${theme.palette.primary.main}`,
      },
    },
  //VERSEOS MEDIUM FIDELITY
  theme.themeType === 'verseOS' &&
    theme.fidelity === 'medium' && {
      boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.4)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.3)}, 0 6px 12px ${alpha(theme.palette.background.paper, 0.6)}`,
      borderColor: alpha(theme.palette.primary.light, 0.3),
      borderLeft: `1px solid ${theme.palette.primary.main}`,
      borderRight: `1px solid ${theme.palette.primary.main}`,
    },
  theme.themeType === 'verseOS' &&
    theme.fidelity === 'medium' &&
    theme.animations === 'high' && {
      transition:
        'box-shadow 0.3s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out, background-color 0.2s ease-in-out',
      '&:hover': {
        borderColor: alpha(theme.palette.primary.light, 0.6),
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        borderRight: `1px solid ${theme.palette.primary.main}`,
        boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.5)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.4)}, 0 12px 24px ${alpha(theme.palette.background.paper, 0.6)}`,
        backgroundColor: alpha(theme.palette.primary.main, 0.8),
      },
    },
  theme.themeType === 'verseOS' &&
    theme.fidelity === 'medium' &&
    theme.animations === 'medium' && {
      transition:
        'box-shadow 0.3s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out',
      '&:hover': {
        borderColor: alpha(theme.palette.primary.light, 0.6),
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        borderRight: `1px solid ${theme.palette.primary.main}`,
        boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.5)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.4)}, 0 12px 24px ${alpha(theme.palette.background.paper, 0.6)}`,
      },
    },
  theme.themeType === 'verseOS' &&
    theme.fidelity === 'medium' &&
    theme.animations === 'low' && {
      transition: 'color 0.2s ease-in-out, border-color 0.2s ease-in-out',
      '&:hover': {
        borderColor: alpha(theme.palette.primary.light, 0.6),
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        borderRight: `1px solid ${theme.palette.primary.main}`,
      },
    },
  //VERSEOS POTATO FIDELITY
  theme.themeType === 'verseOS' &&
    theme.fidelity === 'potato' && {
      color: theme.palette.text.primary,
      transitions: 'none',
      '&:hover': {
        color: theme.palette.text.primary,
      },
    },
  //PIRATEOS BASE THEME
  theme.themeType === 'pirateOS' && {
    backgroundColor: theme.palette.action.hover,
    border: '3px ridge',
    borderColor: theme.palette.secondary.main,
    color: theme.palette.text.secondary,
    transition: 'color 0.2s ease-in-out',
    '&:hover': {
      color: theme.palette.secondary.light,
    },
  },
  //PIRATEOS HIGH FIDELITY
  theme.themeType === 'pirateOS' &&
    theme.fidelity === 'high' && {
      boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.4)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.3)}, 0 6px 12px ${alpha(theme.palette.background.paper, 0.6)}, 0 10px 20px ${alpha(theme.palette.background.default, 0.2)}, inset 0 1px 2px ${alpha(theme.palette.secondary.light, 0.3)}, inset 0 -1px 2px ${alpha(theme.palette.background.default, 0.2)}`,
      zIndex: 0,
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        backgroundImage: `radial-gradient(circle, ${alpha(theme.palette.background.paper, 0.4)} 2px, transparent 1px)`,
        backgroundSize: '6px 6px',
        opacity: 1,
        backgroundPosition: 'center',
      },
    },
  theme.themeType === 'pirateOS' &&
    theme.fidelity === 'high' &&
    theme.animations === 'high' && {
      '@keyframes dotPulse': {
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
      transition: 'box-shadow 0.2s ease-in-out',
      '&:before': {
        transition: 'background-size 0.3s ease-out, opacity 0.3s ease-out',
      },
      '&:hover': {
        boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.5)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.4)}, 0 12px 24px ${alpha(theme.palette.background.paper, 0.6)}, 0 15px 35px ${alpha(theme.palette.background.default, 0.4)}, inset 0 2px 4px ${alpha(theme.palette.secondary.light, 0.4)}, inset 0 -2px 4px ${alpha(theme.palette.background.default, 0.4)}`,
        '&:before': {
          backgroundSize: '8px 8px',
          animation: 'dotPulse 3s infinite ease-in-out',
        },
      },
    },
  theme.themeType === 'pirateOS' &&
    theme.fidelity === 'high' &&
    theme.animations === 'medium' && {
      transition: 'box-shadow 0.2s ease-in-out',
      '&:before': {
        transition: 'background-size 0.3s ease-out, opacity 0.3s ease-out',
      },
      '&:hover': {
        boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.5)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.4)}, 0 12px 24px ${alpha(theme.palette.background.paper, 0.6)}, 0 15px 35px ${alpha(theme.palette.background.default, 0.4)}, inset 0 2px 4px ${alpha(theme.palette.secondary.light, 0.4)}, inset 0 -2px 4px ${alpha(theme.palette.background.default, 0.4)}`,
        '&:before': {
          backgroundSize: '8px 8px',
        },
      },
    },
  theme.themeType === 'pirateOS' &&
    theme.fidelity === 'high' &&
    theme.animations === 'low' && {
      transition: 'box-shadow 0.2s ease-in-out',
      '&:hover': {
        boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.5)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.4)}, 0 12px 24px ${alpha(theme.palette.background.paper, 0.6)}, 0 15px 35px ${alpha(theme.palette.background.default, 0.4)}, inset 0 2px 4px ${alpha(theme.palette.secondary.light, 0.4)}, inset 0 -2px 4px ${alpha(theme.palette.background.default, 0.4)}`,
      },
    },
  //PIRATEOS MEDIUM FIDELITY
  theme.themeType === 'pirateOS' &&
    theme.fidelity === 'medium' && {
      boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.4)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.3)}, 0 6px 12px ${alpha(theme.palette.background.paper, 0.6)}, 0 10px 20px ${alpha(theme.palette.background.default, 0.2)}`,
    },
  theme.themeType === 'pirateOS' &&
    theme.fidelity === 'medium' &&
    (theme.animations === 'high' || theme.animations === 'medium') && {
      transition: 'box-shadow 0.2s ease-in-out',
      '&:hover': {
        boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.5)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.4)}, 0 12px 24px ${alpha(theme.palette.background.paper, 0.6)}, 0 15px 35px ${alpha(theme.palette.background.default, 0.4)}`,
      },
    },
  //PIRATEOS LOW FIDELITY
  theme.themeType === 'pirateOS' &&
    theme.fidelity === 'low' && {
      boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.4)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.3)}, 0 6px 12px ${alpha(theme.palette.background.paper, 0.6)}`,
    },
  theme.themeType === 'pirateOS' &&
    theme.fidelity === 'low' &&
    (theme.animations === 'high' || theme.animations === 'medium') && {
      transition: 'box-shadow 0.2s ease-in-out',
      '&:hover': {
        boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.5)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.4)}, 0 12px 24px ${alpha(theme.palette.background.paper, 0.6)}`,
      },
    },
  //PIRATEOS POTATO FIDELITY
  theme.themeType === 'pirateOS' &&
    theme.fidelity === 'potato' && {
      boxShadow: `0 3px 6px ${alpha(theme.palette.background.paper, 0.3)}`,
    },
  theme.themeType === 'pirateOS' &&
    theme.fidelity === 'potato' &&
    (theme.animations === 'medium' || theme.animations === 'high') && {
      transition: 'box-shadow 0.2s ease-in-out',
      '&:hover': {
        boxShadow: `0 3px 6px ${alpha(theme.palette.background.paper, 0.6)},`,
      },
    },
]);

export default ComponentDisplay;
