import { logoThemeMap } from '@Common/Definitions/Themes/themeMaps';
import { ThemeStyledComponents } from '@Common/Definitions/Themes/themeTypes';
import { alpha, type SxProps, type Theme } from '@mui/material/styles';

export const verseOSCoreBoxes: ThemeStyledComponents = {
  AppDisplay: (theme: Theme): SxProps<Theme> => ({
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
    ...(theme.fidelity === 'high' && {
      '&:before': {
        backgroundImage: `url(${logoThemeMap.verseOSGlow})`,
      },
    }),
    ...(theme.fidelity === 'medium' && {
      '&:before': {
        backgroundImage: `url(${logoThemeMap.verseOS})`,
      },
    }),
    ...((theme.fidelity === 'low' || theme.fidelity === 'potato') && {
      '&:before': {
        backgroundImage: `url(${logoThemeMap.verseOSPotato})`,
      },
    }),
  }),
  FeatureContainer: (theme: Theme): SxProps<Theme> => ({
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
  }),
  FeatureDisplay: (theme: Theme): SxProps<Theme> => ({
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
  }),
  ComponentContainer: (theme: Theme): SxProps<Theme> => ({
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
  }),
  ComponentDisplay: (theme: Theme): SxProps<Theme> => ({
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
  }),
  ControlPanel: (theme: Theme): SxProps<Theme> => ({
    borderLeft: '3px solid',
    borderRight: '3px solid',
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.secondary.main,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.7)}, ${alpha(theme.palette.primary.dark, 0.5)})`,
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
      background: theme.palette.secondary.main,
    },
    // HIGH FIDELITY
    ...(theme.fidelity === 'high' && {
      boxShadow: `0 3px 6px ${alpha(theme.palette.background.paper, 0.4)}, 0 8px 12px ${alpha(theme.palette.background.paper, 0.3)}, 0 15px 25px ${alpha(theme.palette.background.default, 0.2)}, inset 2px 0 3px ${alpha(theme.palette.background.paper, 0.3)},
    inset -2px 0 3px ${alpha(theme.palette.background.paper, 0.3)}`,
      backdropFilter: 'blur(12px)',
      backgroundImage: `linear-gradient(145deg, ${alpha(theme.palette.primary.light, 0.1)}, ${alpha(theme.palette.primary.dark, 0.2)}),
                  linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.5)}, ${alpha(theme.palette.primary.dark, 0.4)})`,
      borderBottom: `1px solid ${alpha(theme.palette.secondary.dark, 0.5)}`,
      borderTop: `1px solid ${alpha(theme.palette.secondary.dark, 0.7)}`,
      borderLeft: `3px ridge ${alpha(theme.palette.secondary.main, 0.6)}`,
      borderRight: `3px ridge ${alpha(theme.palette.secondary.dark, 0.5)}`,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundImage: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.2)} 1px, transparent 1px)`,
        backgroundSize: '5px 5px',
        opacity: 0.5,
        zIndex: -1,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: `linear-gradient(45deg, ${alpha(theme.palette.primary.light, 0.05)}, ${alpha(theme.palette.primary.light, 0.2)} 30%, transparent 60%)`,
        borderRadius: theme.shape.borderRadius,
        zIndex: 1,
        opacity: 0.5,
        pointerEvents: 'none',
      },
    }),
    ...(theme.fidelity === 'high' &&
      theme.animations === 'high' && {
        '@keyframes background-pattern': {
          '0%': {
            backgroundPosition: '0 0',
          },
          '100%': {
            backgroundPosition: '10px 10px',
          },
        },
        '@keyframes light-reflection': {
          '0%': {
            opacity: 0.5,
            transform: 'scale(1.05)',
          },
          '50%': {
            opacity: 0.8,
            transform: 'scale(1.1)',
          },
          '100%': {
            opacity: 0.5,
            transform: 'scale(1.05)',
          },
        },
        transitions:
          'border 0.3s ease, box-shadow 0.3s ease-in-out, background-image 0.3s ease, transform 0.4s ease-in-out',
        '&:hover': {
          borderTop: `1px solid ${alpha(theme.palette.secondary.light, 0.4)}`,
          borderBottom: `1px solid ${alpha(theme.palette.secondary.light, 0.3)}`,
          boxShadow: `0 5px 10px ${alpha(theme.palette.primary.main, 0.3)}, 0 15px 25px ${alpha(theme.palette.primary.dark, 0.4)}, 0 5px 10px ${alpha(theme.palette.primary.light, 0.4)}, 0 15px 25px ${alpha(theme.palette.primary.dark, 0.6)}, inset 3px 0 5px ${alpha(theme.palette.background.paper, 0.4)}, inset -3px 0 5px ${alpha(theme.palette.background.paper, 0.4)}`,
          backgroundImage: `linear-gradient(145deg, ${alpha(theme.palette.primary.light, 0.2)}, ${alpha(theme.palette.primary.main, 0.5)}),
                    linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.6)}, ${alpha(theme.palette.primary.dark, 0.4)})`,
          transform: 'translateY(-3px)',
          overflow: 'hidden',
          '&:before': {
            animation:
              'background-pattern 2s linear infinite, light-reflection 1.5s ease-in-out infinite',
          },
        },
      }),
    ...(theme.fidelity === 'high' &&
      theme.animations === 'medium' && {
        transitions:
          'border 0.3s ease, box-shadow 0.3s ease-in-out, background-image 0.3s ease',
        '&:hover': {
          borderTop: `1px solid ${alpha(theme.palette.secondary.light, 0.4)}`,
          borderBottom: `1px solid ${alpha(theme.palette.secondary.light, 0.3)}`,
          boxShadow: `0 5px 10px ${alpha(theme.palette.primary.main, 0.3)}, 0 15px 25px ${alpha(theme.palette.primary.dark, 0.4)}, inset 3px 0 5px ${alpha(theme.palette.background.paper, 0.4)}, inset -3px 0 5px ${alpha(theme.palette.background.paper, 0.4)}`,
          backgroundImage: `linear-gradient(145deg, ${alpha(theme.palette.primary.light, 0.2)}, ${alpha(theme.palette.primary.main, 0.5)}),
                    linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.6)}, ${alpha(theme.palette.primary.dark, 0.4)})`,
        },
      }),
    ...(theme.fidelity === 'high' &&
      theme.animations === 'low' && {
        transitions:
          'border 0.3s ease, box-shadow 0.3s ease-in-out, background-image 0.3s ease',
        '&:hover': {
          borderTop: `1px solid ${alpha(theme.palette.secondary.light, 0.4)}`,
          borderBottom: `1px solid ${alpha(theme.palette.secondary.light, 0.3)}`,
          boxShadow: `0 5px 10px ${alpha(theme.palette.primary.main, 0.3)}, 0 15px 25px ${alpha(theme.palette.primary.dark, 0.4)}`,
        },
      }),
    // MEDIUM FIDELITY
    ...(theme.fidelity === 'medium' && {
      boxShadow: `0 3px 6px ${alpha(theme.palette.background.paper, 0.4)}, 0 8px 12px ${alpha(theme.palette.background.paper, 0.3)}, 0 15px 25px ${alpha(theme.palette.background.default, 0.2)}`,
      backgroundImage: `linear-gradient(145deg, ${alpha(theme.palette.primary.light, 0.1)}, ${alpha(theme.palette.primary.dark, 0.2)})`,
      borderBottom: `1px solid ${alpha(theme.palette.secondary.dark, 0.5)}`,
      borderTop: `1px solid ${alpha(theme.palette.secondary.dark, 0.7)}`,
      borderLeft: `3px ridge ${alpha(theme.palette.secondary.main, 0.6)}`,
      borderRight: `3px ridge ${alpha(theme.palette.secondary.dark, 0.5)}`,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundImage: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.2)} 1px, transparent 1px)`,
        backgroundSize: '5px 5px',
        opacity: 0.5,
        zIndex: -1,
      },
    }),
    ...(theme.fidelity === 'high' &&
      theme.animations === 'high' && {
        transitions: 'border 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:before': {
          transitions: 'opacity 0.4s ease',
        },
        '&:hover': {
          borderTop: `1px solid ${alpha(theme.palette.secondary.light, 0.4)}`,
          borderBottom: `1px solid ${alpha(theme.palette.secondary.light, 0.3)}`,
          boxShadow: `0 5px 10px ${alpha(theme.palette.primary.main, 0.3)}, 0 15px 25px ${alpha(theme.palette.primary.dark, 0.4)}, inset 3px 0 5px ${alpha(theme.palette.background.paper, 0.4)}, inset -3px 0 5px ${alpha(theme.palette.background.paper, 0.4)}`,
          '&:before': {
            opacity: 0.3,
          },
        },
      }),
    ...(theme.fidelity === 'high' &&
      theme.animations === 'medium' && {
        transitions: 'border 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          borderTop: `1px solid ${alpha(theme.palette.secondary.light, 0.4)}`,
          borderBottom: `1px solid ${alpha(theme.palette.secondary.light, 0.3)}`,
          boxShadow: `0 5px 10px ${alpha(theme.palette.primary.main, 0.3)}, 0 15px 25px ${alpha(theme.palette.primary.dark, 0.4)},`,
        },
      }),
    ...(theme.fidelity === 'high' &&
      theme.animations === 'low' && {
        transitions: 'border 0.3s ease-in-out',
        '&:hover': {
          borderTop: `1px solid ${alpha(theme.palette.secondary.light, 0.4)}`,
          borderBottom: `1px solid ${alpha(theme.palette.secondary.light, 0.3)}`,
        },
      }),
  }),
};
