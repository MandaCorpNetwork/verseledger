import { alpha, SxProps, Theme } from '@mui/material/styles';

export const verseOSFeatureContainer = (theme: Theme): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: 'column',
  borderTop: '2px solid',
  borderBottom: '2px solid',
  borderRadius: '10px',
  borderColor: theme.palette.secondary.main,
  height: '100%',
  backgroundColor: alpha(theme.palette.background.paper, 0.5),
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
  ...(theme.fidelity === 'high' && {
    backgroundColor: alpha(theme.palette.background.paper, 0.3),
    backdropFilter: 'blur(10px)',
  }),
});

export const verseOSFeatureDisplay = (theme: Theme): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  borderTop: '2px solid',
  borderBottom: '2px solid',
  borderRadius: '10px',
  borderColor: theme.palette.primary.main,
  borderLeft: `1px solid ${alpha(theme.palette.primary.main, 0.8)}`,
  borderRight: `1px solid ${alpha(theme.palette.primary.main, 0.8)}`,
  backgroundColor: alpha(theme.palette.background.paper, 0.6),
  padding: '0.5em 1em',
  overflow: 'hidden',
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
  // HIGH FIDELITY
  ...(theme.fidelity === 'high' && {
    boxShadow: `0 8px 12px rgba(0,0,0,0.4), 0 4px 6px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2), 0 1px 2px ${alpha(theme.palette.secondary.light, 0.2)}, 0 3px 5px ${alpha(theme.palette.secondary.light, 0.1)}`,
    backdropFilter: 'blur(5px)',
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.secondary.dark, 0.5)} 0%, ${alpha(theme.palette.action.disabled, 0.1)} 100%)`,
  }),
  // MEDIUM FIDELITY
  ...(theme.fidelity === 'medium' && {
    boxShadow: `0 4px 6px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)`,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.secondary.dark, 0.5)} 0%, ${alpha(theme.palette.action.disabled, 0.1)} 100%)`,
  }),
  // LOW & POTATO FIDELITY
  ...((theme.fidelity === 'low' || theme.fidelity === 'potato') && {
    backgroundColor: alpha(theme.palette.action.disabled, 0.2),
  }),
});

export const verseOSComponentContainer = (theme: Theme): SxProps<Theme> => ({
  borderTop: '2px solid',
  borderBottom: '2px solid',
  borderRadius: '5px',
  borderColor: theme.palette.primary.main,
  borderLeft: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
  borderRight: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
  backgroundColor: alpha(theme.palette.divider, 0.1),

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
  // HIGH FIDELITY
  ...(theme.fidelity === 'high' && {
    boxShadow: `0 1px 3px ${alpha(theme.palette.primary.main, 0.4)}, 0 4px 6px ${alpha(theme.palette.primary.main, 0.3)}, 0 10px 20px ${alpha(theme.palette.primary.main, 0.2)}, 0 2px 4px rgba(0,0,0,0.6), inset 0 1px 2px ${alpha(theme.palette.divider, 0.05)}`,
    backdropFilter: 'blur(10px)',
    zIndex: 1,
    '&::before': {
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
  }),
  ...(theme.fidelity === 'high' &&
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
    }),
  ...(theme.fidelity === 'high' &&
    theme.animations === 'medium' && {
      transition: 'box-shadow 0.3s ease-in-out',
      '&:hover': {
        boxShadow: `0 3px 8px ${alpha(theme.palette.primary.main, 0.5)}, 0 8px 16px ${alpha(theme.palette.primary.main, 0.4)}, 0 20px 40px ${alpha(theme.palette.primary.main, 0.3)}, 0 5px 10px rgb(0,0,0,0.7), inset 0 2px 4px ${alpha(theme.palette.divider, 0.1)}`,
      },
    }),
  // MEDIUM FIDELITY
  ...(theme.fidelity === 'medium' && {
    boxShadow: `0 1px 3px ${alpha(theme.palette.primary.main, 0.4)}, 0 4px 6px ${alpha(theme.palette.primary.main, 0.3)}, 0 10px 20px ${alpha(theme.palette.primary.main, 0.2)}, 0 2px 4px rgba(0,0,0,0.6), inset 0 1px 2px ${alpha(theme.palette.divider, 0.05)}`,
  }),
  ...(theme.fidelity === 'medium' &&
    theme.animations === 'high' && {
      transition: 'box-shadow 0.3s ease-in-out',
      '&:hover': {
        boxShadow: `0 3px 8px ${alpha(theme.palette.primary.main, 0.5)}, 0 8px 16px ${alpha(theme.palette.primary.main, 0.4)}, 0 20px 40px ${alpha(theme.palette.primary.main, 0.3)}, 0 5px 10px rgb(0,0,0,0.7), inset 0 2px 4px ${alpha(theme.palette.divider, 0.1)}`,
      },
    }),
  ...(theme.fidelity === 'medium' &&
    theme.animations === 'medium' && {
      transition: 'box-shadow 0.3s ease-in-out',
      boxShadow:
        '0 2px 3px rgb(0,0,0,0.4), 0 4px 6px rgb(0,0,0,0.3), 0 10px 20px rgb(0,0,0,0.2)',
      '&:hover': {
        boxShadow:
          '0 3px 6px rgb(0,0,0,0.6), 0 8px 12px rgb(0,0,0,0.5), 0 15px 35px rgb(0,0,0,0.4)',
      },
    }),
});

export const verseOSComponentDisplay = (theme: Theme): SxProps<Theme> => ({
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
  // HIGH FIDELITY
  ...(theme.fidelity === 'high' && {
    boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.4)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.3)}, 0 6px 12px ${alpha(theme.palette.background.paper, 0.6)}, 0 10px 20px ${alpha(theme.palette.background.default, 0.2)}, inset 0 1px 2px ${alpha(theme.palette.primary.main, 0.3)}, inset 0 -1px 2px ${alpha(theme.palette.background.default, 0.2)}`,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.4)} 0%, ${alpha(theme.palette.primary.dark, 0.6)} 100%)`,
    borderColor: alpha(theme.palette.primary.light, 0.3),
    borderLeft: `1px solid ${theme.palette.primary.main}`,
    borderRight: `1px solid ${theme.palette.primary.main}`,
  }),
  ...(theme.fidelity === 'high' &&
    (theme.animations === 'high' || theme.animations === 'medium') && {
      transition:
        'box-shadow 0.3s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out',
      '&:hover': {
        boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.5)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.4)}, 0 12px 24px ${alpha(theme.palette.background.paper, 0.6)}, 0 15px 35px ${alpha(theme.palette.background.default, 0.4)}, inset 0 2px 4px ${alpha(theme.palette.primary.main, 0.5)}, inset 0 -2px 4px ${alpha(theme.palette.background.default, 0.4)}`,
        borderColor: alpha(theme.palette.primary.light, 0.6),
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        borderRight: `1px solid ${theme.palette.primary.main}`,
      },
    }),
  // MEDIUM FIDELITY
  ...(theme.fidelity === 'medium' && {
    boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.4)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.3)}, 0 6px 12px ${alpha(theme.palette.background.paper, 0.6)}`,
    borderColor: alpha(theme.palette.primary.light, 0.3),
    borderLeft: `1px solid ${theme.palette.primary.main}`,
    borderRight: `1px solid ${theme.palette.primary.main}`,
  }),
  ...(theme.fidelity === 'medium' &&
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
    }),
  ...(theme.fidelity === 'medium' &&
    theme.animations === 'medium' && {
      transition:
        'box-shadow 0.3s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out',
      '&:hover': {
        borderColor: alpha(theme.palette.primary.light, 0.6),
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        borderRight: `1px solid ${theme.palette.primary.main}`,
        boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.5)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.4)}, 0 12px 24px ${alpha(theme.palette.background.paper, 0.6)}`,
      },
    }),
  ...(theme.fidelity === 'medium' &&
    theme.animations === 'low' && {
      transition: 'color 0.2s ease-in-out, border-color 0.2s ease-in-out',
      '&:hover': {
        borderColor: alpha(theme.palette.primary.light, 0.6),
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        borderRight: `1px solid ${theme.palette.primary.main}`,
      },
    }),
  // POTATO FIDELITY
  ...(theme.fidelity === 'potato' && {
    color: theme.palette.text.primary,
    transitions: 'none',
    '&:hover': {
      color: theme.palette.text.primary,
    },
  }),
});
