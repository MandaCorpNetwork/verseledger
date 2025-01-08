import type { ThemeStyledComponents } from '@Common/Definitions/Themes/themeTypes';
import { alpha, type SxProps, type Theme } from '@mui/material/styles';

import { verseOSMainScroll } from './Scrollbars';

export const verseOSMenus: ThemeStyledComponents = {
  DropdownStack: (theme: Theme): SxProps<Theme> => ({
    ...verseOSMainScroll,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    ...(theme.fidelity === 'high' && {
      backgroundColor: alpha(theme.palette.background.paper, 0.3),
      backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.7)}, ${alpha(theme.palette.primary.dark, 0.6)})`,
      backdropFilter: 'blur(10px)',
      boxShadow: `0 1px 3px ${alpha(theme.palette.background.paper, 0.5)}, 0 4px 6px ${alpha(theme.palette.background.paper, 0.3)}, 0 10px 20px ${alpha(theme.palette.background.paper, 0.2)}, 0 1px 1px ${alpha(theme.palette.secondary.main, 0.2)}`,
    }),
    ...(theme.fidelity === 'high' &&
      theme.animations === 'high' && {
        '@keyframes pulseShadow': {
          '0%': {
            boxShadow: `0 3px 6px ${alpha(theme.palette.background.paper, 0.3)}, 0 8px 12px ${alpha(theme.palette.background.paper, 0.2)}, 0 20px 35px ${alpha(theme.palette.background.paper, 0.2)}, 0 4px 4px ${alpha(theme.palette.secondary.main, 0.3)}`,
          },
          '50%': {
            boxShadow: `0 3px 6px ${alpha(theme.palette.background.paper, 0.6)}, 0 8px 12px ${alpha(theme.palette.background.paper, 0.4)}, 0 20px 35px ${alpha(theme.palette.background.paper, 0.3)}, 0 4px 4px ${alpha(theme.palette.secondary.main, 0.3)}`,
          },
          '100%': {
            boxShadow: `0 3px 6px ${alpha(theme.palette.background.paper, 0.3)}, 0 8px 12px ${alpha(theme.palette.background.paper, 0.2)}, 0 20px 35px ${alpha(theme.palette.background.paper, 0.2)}, 0 4px 4px ${alpha(theme.palette.secondary.main, 0.3)}`,
          },
        },
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: `0 3px 6px ${alpha(theme.palette.background.paper, 0.6)}, 0 8px 12px ${alpha(theme.palette.background.paper, 0.4)}, 0 20px 35px ${alpha(theme.palette.background.paper, 0.3)}, 0 4px 4px ${alpha(theme.palette.secondary.main, 0.3)}`,
        },
        '&:focus': {
          animation: 'pulseShadow 0.5s infinite',
        },
      }),
    ...(theme.fidelity === 'high' &&
      theme.animations === 'medium' && {
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: `0 3px 6px ${alpha(theme.palette.background.paper, 0.6)}, 0 8px 12px ${alpha(theme.palette.background.paper, 0.4)}, 0 20px 35px ${alpha(theme.palette.background.paper, 0.3)}, 0 4px 4px ${alpha(theme.palette.secondary.main, 0.3)}`,
        },
      }),
    ...(theme.fidelity === 'medium' && {
      backgroundColor: alpha(theme.palette.background.paper, 0.8),
      backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.7)}, ${alpha(theme.palette.primary.dark, 0.6)})`,
      boxShadow: `0 1px 3px ${alpha(theme.palette.background.paper, 0.5)}, 0 4px 6px ${alpha(theme.palette.background.paper, 0.3)}, 0 1px 1px ${alpha(theme.palette.secondary.main, 0.2)}`,
    }),
    ...(theme.fidelity === 'medium' &&
      theme.animations === 'high' && {
        '@keyframes pulseShadow': {
          '0%': {
            boxShadow: `0 3px 6px ${alpha(theme.palette.background.paper, 0.3)}, 0 8px 12px ${alpha(theme.palette.background.paper, 0.2)}, 0 4px 4px ${alpha(theme.palette.secondary.main, 0.3)}`,
          },
          '50%': {
            boxShadow: `0 3px 6px ${alpha(theme.palette.background.paper, 0.6)}, 0 8px 12px ${alpha(theme.palette.background.paper, 0.4)}, 0 4px 4px ${alpha(theme.palette.secondary.main, 0.3)}`,
          },
          '100%': {
            boxShadow: `0 3px 6px ${alpha(theme.palette.background.paper, 0.3)}, 0 8px 12px ${alpha(theme.palette.background.paper, 0.2)}, 0 4px 4px ${alpha(theme.palette.secondary.main, 0.3)}`,
          },
        },
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: `0 3px 6px ${alpha(theme.palette.background.paper, 0.6)}, 0 8px 12px ${alpha(theme.palette.background.paper, 0.4)}, 0 4px 4px ${alpha(theme.palette.secondary.main, 0.3)}`,
        },
        '&:focus': {
          animation: 'pulseShadow 0.5s infinite',
        },
      }),
    ...(theme.fidelity === 'medium' &&
      theme.animations === 'medium' && {
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: `0 3px 6px ${alpha(theme.palette.background.paper, 0.6)}, 0 8px 12px ${alpha(theme.palette.background.paper, 0.4)}, 0 4px 4px ${alpha(theme.palette.secondary.main, 0.3)}`,
        },
      }),
    ...(theme.fidelity === 'low' && {
      backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.7)}, ${alpha(theme.palette.primary.dark, 0.6)})`,
      boxShadow: `0 1px 3px ${alpha(theme.palette.background.paper, 0.5)}, 0 4px 6px ${alpha(theme.palette.background.paper, 0.3)}`,
    }),
    ...(theme.fidelity === 'low' &&
      theme.animations === 'high' && {
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: `0 3px 6px ${alpha(theme.palette.background.paper, 0.6)}, 0 8px 12px ${alpha(theme.palette.background.paper, 0.4)}`,
        },
      }),
    ...(theme.fidelity === 'potato' && {
      border: '2px solid',
      borderColor: theme.palette.primary.light,
    }),
  }),
};
