import type { ThemeStyledComponents } from '@Common/Definitions/Themes/themeTypes';
import { alpha, type SxProps, type Theme } from '@mui/material/styles';

export const verseOSButtons: ThemeStyledComponents = {
  'Buttons.DataDisplayGroup': (theme: Theme): SxProps<Theme> => ({
    border: '1px solid',
    borderColor: theme.palette.secondary.dark,
    ...((theme.fidelity === 'high' || theme.fidelity === 'medium') && {
      boxShadow: `0 1px 3px ${alpha(theme.palette.background.paper, 0.5)}, 0 4px 6px ${alpha(theme.palette.background.paper, 0.3)}, 0 1px 2px ${alpha(theme.palette.secondary.main, 0.2)}`,
    }),
    ...((theme.fidelity === 'high' || theme.fidelity === 'medium') &&
      theme.animations === 'high' && {
        transition: 'box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out',
        '&:hover': {
          borderColor: theme.palette.secondary.main,
          boxShadow: `0 3px 6px ${alpha(theme.palette.background.paper, 0.6)}, 0 8px 12px ${alpha(theme.palette.background.paper, 0.5)}, 0 2px 4px ${alpha(theme.palette.secondary.main, 0.4)}`,
        },
      }),
    ...(theme.fidelity === 'high' &&
      theme.animations === 'high' && {
        opacity: '0.8',
        transition:
          'box-shadow 0.3s ease-in-out, opacity 0.2s ease, border-color 0.3s ease-in-out',
        '&:hover': {
          opacity: 1,
        },
      }),
  }),
  /** ToggleButton for Data Display Global Overwrite
   * TODO:
   * - Shake Animation for Selected Active
   */
  'Buttons.DataDisplayToggleButton': (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.secondary.dark,
    bgcolor: theme.palette.primary.dark,
    transition: 'color 0.3s ease-in-out',
    '&:hover': {
      color: theme.palette.primary.light,
    },
    '&.Mui-selected': {
      color: theme.palette.secondary.main,
      bgcolor: theme.palette.primary.main,
      '&:hover': {
        color: theme.palette.secondary.light,
      },
    },
  }),
  'Buttons.DataDisplayToggleIcon': (theme: Theme): SxProps<Theme> => ({
    ...((theme.animations === 'high' || theme.animations === 'medium') && {
      transiton: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.2)',
      },
    }),
  }),
};
