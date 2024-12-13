import Hexes from '@Assets/Images/Textures/0010.png?url';
import Burn1 from '@Assets/Images/Textures/burn1.png?url';
import ObjectsUI from '@Assets/Images/Textures/ConscientiousObjects.jpg?url';
import Shotgun from '@Assets/Images/Textures/shotgun.png?url';
import Skutters from '@Assets/Images/Textures/SkuttersUI.png?url';
import { logoThemeMap } from '@Common/Definitions/Themes/ThemeMaps';
import { SxProps } from '@mui/material';
import { alpha, Theme } from '@mui/material/styles';

export const pirateOSCoreBoxes: ThemeStyledComponents = {
  AppDisplay: (theme: Theme): SxProps<Theme> => ({
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
    ...(theme.fidelity === 'high' && {
      '&:before': {
        backgroundImage: `url(${logoThemeMap.pirateOSGlow})`,
      },
    }),
    ...(theme.fidelity === 'medium' && {
      '&:before': {
        backgroundImage: `url(${logoThemeMap.pirateOS})`,
      },
    }),
    ...((theme.fidelity === 'low' || theme.fidelity === 'potato') && {
      '&:before': {
        backgroundImage: `url(${logoThemeMap.pirateOSPotato})`,
      },
    }),
  }),
  FeatureContainer: (theme: Theme): SxProps<Theme> => ({
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
    ...(theme.fidelity === 'high' && {
      backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.primary.dark, 0.2)} 10%, ${alpha(theme.palette.background.paper, 0.8)} 80%)`,
      backdropFilter: 'blur(5px)',
      boxShadow: `8px 12px 40px rgba(0,0,0,0.5), -2px -6px 40px rgba(0,0,0,0.2), 0 0 50px ${alpha(theme.palette.primary.light, 0.2)}`,
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -1,
        backgroundImage: `url(${ObjectsUI})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.2,
        maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 70%, transparent 100%)',
        pointerEvents: 'none',
      },
    }),
    ...(theme.fidelity === 'medium' && {
      backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.primary.dark, 0.2)} 10%, ${alpha(theme.palette.background.paper, 0.8)} 80%)`,
      boxShadow: `8px 12px 40px rgba(0,0,0,0.5), -2px -6px 40px rgba(0,0,0,0.2), 0 0 50px ${alpha(theme.palette.primary.light, 0.2)}`,
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -1,
        backgroundImage: `url(${ObjectsUI})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.2,
        pointerEvents: 'none',
      },
    }),
  }),
  FeatureDisplay: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    padding: '0.3em 0.5em',
    overflow: 'hidden',
    backgroundColor: alpha(theme.palette.background.paper, 0.6),
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
    // HIGH FIDELITY
    ...(theme.fidelity === 'high' && {
      backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.primary.light, 0.5)} 0%, ${alpha(theme.palette.primary.dark, 0.3)} 100%)`,
      boxShadow: `4px 6px 20px rgba(0,0,0,0.5), -1px -3px 20px rgba(0,0,0,0.2), 0 0 25px ${alpha(theme.palette.primary.light, 0.2)}`,
      // '&::before': {
      //   content: '""',
      //   position: 'absolute',
      //   top: 0,
      //   left: '50%',
      //   right: 0,
      //   bottom: 0,
      //   borderTop: '3px solid',
      //   borderBottom: '3px solid',
      //   boxSizing: 'border-box',
      //   width: '80%',
      //   pointerEvents: 'none',
      //   transform: 'translateX(-50%)',
      //   borderColor: theme.palette.secondary.light,
      //   opacity: 0.3,
      // },
      // '&::after': {
      //   content: '""',
      //   position: 'absolute',
      //   top: '50%',
      //   left: 0,
      //   right: 0,
      //   height: '80%',
      //   transform: 'translateY(-50%)',
      //   borderLeft: '3px solid',
      //   borderRight: '3px solid',
      //   boxSizing: 'border-box',
      //   pointerEvents: 'none',
      //   borderColor: theme.palette.secondary.light,
      //   opacity: 0.3,
      // },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -1,
        backgroundImage: `url(${Burn1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        pointerEvents: 'none',
        opacity: 1,
      },
    }),
    ...(theme.fidelity === 'high' &&
      theme.animations === 'high' && {
        '&:after': {
          transition: 'transform 1s ease-in-out',
        },
        '&:hover': {
          '&:after': {
            transform: 'scale(1.05)',
          },
        },
      }),
    // MEDIUM FIDELITY
    ...(theme.fidelity === 'medium' && {
      backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.primary.light, 0.7)}, ${alpha(theme.palette.primary.dark, 0.3)})`,
      border: '3px solid',
      borderColor: theme.palette.secondary.light,
    }),
    // LOW & POTATO FIDELITY
    ...((theme.fidelity === 'low' || theme.fidelity === 'potato') && {
      backgroundColor: theme.palette.primary.light,
      border: '3px solid',
      borderColor: theme.palette.secondary.light,
    }),
  }),
  ComponentContainer: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: alpha(theme.palette.divider, 0.8),
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
    // HIGH FIDELITY
    ...(theme.fidelity === 'high' && {
      backdropFilter: 'blur(10px)',
      boxShadow: `0 4px 6px ${alpha(theme.palette.background.default, 0.3)}, 0 10px 20px ${alpha(theme.palette.background.default, 0.2)}, 0 2px 4px ${alpha(theme.palette.background.paper, 0.2)}`,
      border: `1px solid ${theme.palette.background.paper}`,
      // '&::before': {
      //   content: '""',
      //   position: 'absolute',
      //   inset: 0,
      //   background: `radial-gradient(circle at right, ${alpha(theme.palette.primary.dark, 0.2)} 10%, transparent 70%)`,
      //   pointerEvents: 'none',
      //   transition: 'background 0.3s ease-in-out',
      // },
      //TODO: Run with a Shine Animation instead
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -1,
        backgroundImage: `linear-gradient(180deg, ${theme.palette.secondary.dark} 5%, ${theme.palette.background.default} 100%)`,
        pointerEvents: 'none',
        opacity: 0.6,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -2,
        backgroundImage: `url(${Shotgun})`,
        backgroundSize: 'cover',
        pointerEvents: 'none',
        opacity: 0.7,
      },
    }),
    ...(theme.fidelity === 'high' &&
      theme.animations === 'high' && {
        // '@keyframes pulseRadial': {
        //   '0%': {
        //     opacity: 0.6,
        //   },
        //   '50%': {
        //     opacity: 1,
        //   },
        //   '100%': {
        //     opacity: 0.6,
        //   },
        // },
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: `0 8px 12px ${alpha(theme.palette.background.default, 0.5)}, 0 20px 40px ${alpha(theme.palette.background.default, 0.4)}, 0 4px 8px ${alpha(theme.palette.background.paper, 0.3)}`,
          // '&::before': {
          //   background: `radial-gradient(circle at right, ${alpha(theme.palette.primary.dark, 0.4)} 10%, transparent 70%)`,
          //   animation: 'pulseRadial 3s infinite ease-in-out',
          // },
        },
      }),
    // MEDIUM FIDELITY
    ...(theme.fidelity === 'medium' && {
      boxShadow: `0 4px 6px ${alpha(theme.palette.background.default, 0.3)}, 0 10px 20px ${alpha(theme.palette.background.default, 0.2)}, 0 2px 4px ${alpha(theme.palette.background.paper, 0.2)}`,
      border: `1px solid ${theme.palette.background.paper}`,
    }),
    ...(theme.fidelity === 'medium' &&
      theme.animations === 'high' && {
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: `0 8px 12px ${alpha(theme.palette.background.default, 0.5)}, 0 20px 40px ${alpha(theme.palette.background.default, 0.4)}, 0 4px 8px ${alpha(theme.palette.background.paper, 0.3)}`,
        },
      }),
    // LOW FIDELITY
    ...(theme.fidelity === 'low' && {
      border: `1px solid ${theme.palette.background.paper}`,
    }),
  }),
  ComponentDisplay: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: theme.palette.background.paper,
    border: '3px ridge',
    borderColor: theme.palette.secondary.main,
    color: theme.palette.text.secondary,
    transition: 'color 0.2s ease-in-out',
    '&:hover': {
      color: theme.palette.secondary.light,
    },
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
    // HIGH FIDELITY
    ...(theme.fidelity === 'high' && {
      boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.4)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.3)}, 0 6px 12px ${alpha(theme.palette.background.paper, 0.6)}, 0 10px 20px ${alpha(theme.palette.background.default, 0.2)}, inset 0 1px 2px ${alpha(theme.palette.secondary.light, 0.3)}, inset 0 -1px 2px ${alpha(theme.palette.background.default, 0.2)}`,
      zIndex: 0,
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -2,
        backgroundImage: `url(${Hexes})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        pointerEvents: 'none',
        opacity: 0.4,
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -1,
        backgroundImage: `linear-gradient(180deg, ${theme.palette.secondary.dark} 5%, ${theme.palette.background.default} 100%)`,
        pointerEvents: 'none',
        opacity: 0.6,
      },
    }),
    ...(theme.fidelity === 'high' &&
      theme.animations === 'high' && {
        transition: 'box-shadow 0.2s ease-in-out',
        '&:hover': {
          boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.5)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.4)}, 0 12px 24px ${alpha(theme.palette.background.paper, 0.6)}, 0 15px 35px ${alpha(theme.palette.background.default, 0.4)}, inset 0 2px 4px ${alpha(theme.palette.secondary.light, 0.4)}, inset 0 -2px 4px ${alpha(theme.palette.background.default, 0.4)}`,
        },
      }),
    ...(theme.fidelity === 'high' &&
      theme.animations === 'medium' && {
        transition: 'box-shadow 0.2s ease-in-out',
        '&:hover': {
          boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.5)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.4)}, 0 12px 24px ${alpha(theme.palette.background.paper, 0.6)}, 0 15px 35px ${alpha(theme.palette.background.default, 0.4)}, inset 0 2px 4px ${alpha(theme.palette.secondary.light, 0.4)}, inset 0 -2px 4px ${alpha(theme.palette.background.default, 0.4)}`,
        },
      }),
    ...(theme.fidelity === 'high' &&
      theme.animations === 'low' && {
        transition: 'box-shadow 0.2s ease-in-out',
        '&:hover': {
          boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.5)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.4)}, 0 12px 24px ${alpha(theme.palette.background.paper, 0.6)}, 0 15px 35px ${alpha(theme.palette.background.default, 0.4)}, inset 0 2px 4px ${alpha(theme.palette.secondary.light, 0.4)}, inset 0 -2px 4px ${alpha(theme.palette.background.default, 0.4)}`,
        },
      }),
    // MEDIUM FIDELITY
    ...(theme.fidelity === 'medium' && {
      boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.4)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.3)}, 0 6px 12px ${alpha(theme.palette.background.paper, 0.6)}, 0 10px 20px ${alpha(theme.palette.background.default, 0.2)}`,
    }),
    ...(theme.fidelity === 'medium' &&
      (theme.animations === 'high' || theme.animations === 'medium') && {
        transition: 'box-shadow 0.2s ease-in-out',
        '&:hover': {
          boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.5)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.4)}, 0 12px 24px ${alpha(theme.palette.background.paper, 0.6)}, 0 15px 35px ${alpha(theme.palette.background.default, 0.4)}`,
        },
      }),
    // LOW FIDELITY
    ...(theme.fidelity === 'low' && {
      boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.4)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.3)}, 0 6px 12px ${alpha(theme.palette.background.paper, 0.6)}`,
    }),
    ...(theme.fidelity === 'low' &&
      (theme.animations === 'high' || theme.animations === 'medium') && {
        transition: 'box-shadow 0.2s ease-in-out',
        '&:hover': {
          boxShadow: `0 1px 3px ${alpha(theme.palette.background.default, 0.5)}, 0 3px 6px ${alpha(theme.palette.background.paper, 0.4)}, 0 12px 24px ${alpha(theme.palette.background.paper, 0.6)}`,
        },
      }),
    // POTATO FIDELITY
    ...(theme.fidelity === 'potato' && {
      boxShadow: `0 3px 6px ${alpha(theme.palette.background.paper, 0.3)}`,
    }),
    ...(theme.fidelity === 'potato' &&
      (theme.animations === 'medium' || theme.animations === 'high') && {
        transition: 'box-shadow 0.2s ease-in-out',
        '&:hover': {
          boxShadow: `0 3px 6px ${alpha(theme.palette.background.paper, 0.6)},`,
        },
      }),
  }),
  ControlPanel: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: alpha(theme.palette.primary.main, 0.3),
    border: `3px ridge ${theme.palette.secondary.main}`,
    '&:hover': {
      color: theme.palette.secondary.light,
    },
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
    ...((theme.fidelity === 'high' || theme.fidelity === 'medium') && {
      boxShadow: `0 8px 12px ${alpha(theme.palette.background.default, 0.4)}, 0 16px 30px ${alpha(theme.palette.background.default, 0.3)}, 0 4px 8px ${alpha(theme.palette.background.paper, 0.3)}`,
      backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.primary.dark, 0.4)}, ${alpha(theme.palette.background.default, 0.2)})`,
      backgroundColor: alpha(theme.palette.background.default, 0.2),
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -2,
        backgroundImage: `url(${Skutters})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        pointerEvents: 'none',
        opacity: 1,
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        backgroundImage: `radial-gradient(circle, ${alpha(theme.palette.background.paper, 1)} 2px, transparent 1px)`,
        backgroundSize: '6px 6px',
        opacity: 0.6,
        backgroundPosition: 'center',
        pointerEvents: 'none',
      },
    }),
    ...((theme.fidelity === 'high' || theme.fidelity === 'medium') &&
      (theme.animations === 'high' || theme.animations === 'medium') && {
        '@keyframes dotPulse': {
          '0%': {
            opacity: 0.6,
          },
          '50%': {
            opacity: 0.8,
          },
          '100%': {
            opacity: 0.6,
          },
        },
        transition:
          'box-shadow 0.3s ease-in-out, background-color 0.4s ease-in-out, border 0.3s ease',
        '&:before': {
          transition: 'background-size 0.3s ease-out, opacity 0.3s ease-out',
        },
        '&:hover': {
          boxShadow: `0 16px 24px ${alpha(theme.palette.background.default, 0.5)}, 0 30px 40px ${alpha(theme.palette.background.default, 0.4)}, 0 8px 16px ${alpha(theme.palette.background.paper, 0.4)}`,
          // background: `linear-gradient(180deg, ${alpha(theme.palette.primary.dark, 0.6)}, ${alpha(theme.palette.background.default, 0.5)})`,
          backgroundColor: alpha(theme.palette.background.default, 0.4),
          borderColor: theme.palette.secondary.dark,
          '&:before': {
            backgroundSize: '8px 8px',
            animation: 'dotPulse 3s infinite ease-in-out',
          },
        },
      }),
  }),
};
