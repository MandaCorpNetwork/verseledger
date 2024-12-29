import type { ThemeStyledComponents } from '@Common/Definitions/Themes/themeTypes';
import { alpha, type SxProps, type Theme } from '@mui/material/styles';

export const verseOSContractsComponents: ThemeStyledComponents = {
  'Contracts.ArchetypeListButton': (theme: Theme): SxProps<Theme> => ({
    padding: '1em',
    borderRadius: '10px',
    border: '2px solid',
    borderColor: theme.palette.primary.main,
    my: '1em',
    color: theme.palette.text.secondary,
    ...(theme.fidelity === 'high' && {
      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.6)}, ${alpha(theme.palette.action.disabledBackground, 0.6)})`,
      boxShadow: `0 2px 4px ${alpha(theme.palette.background.paper, 0.4)}, 0 8px 12px ${alpha(theme.palette.background.paper, 0.3)}, 1px 1px 10px ${alpha(theme.palette.background.paper, 0.2)}`,
    }),
    ...(theme.fidelity === 'high' &&
      (theme.animations === 'high' || theme.animations === 'medium') && {
        transition: 'border-color 0.2s ease-in, box-shadow 0.3s ease-in-out',
        '&:hover': {
          borderColor: theme.palette.primary.light,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.8)}, ${alpha(theme.palette.action.disabledBackground, 0.6)})`,
          backgroundColor: theme.palette.primary.light,
          boxShadow: `0 4px 8px ${alpha(theme.palette.background.paper, 0.6)}, 0 12px 24px ${alpha(theme.palette.background.paper, 0.5)}, 1px 1px 10px ${alpha(theme.palette.background.paper, 0.3)}`,
          color: theme.palette.text.primary,
        },
        '&.Mui-selected': {
          color: theme.palette.secondary.main,
          borderColor: theme.palette.secondary.main,
          backgroundColor: alpha(theme.palette.action.active, 0.6),
          boxShadow: `0 2px 4px ${alpha(theme.palette.secondary.light, 0.5)}, 0 8px 12px ${alpha(theme.palette.background.paper, 0.3)}, 1px 1px 10px ${alpha(theme.palette.background.paper, 0.2)}`,
          '&:hover': {
            color: theme.palette.secondary.dark,
            borderColor: theme.palette.secondary.dark,
            backgroundColor: theme.palette.action.disabled,
          },
        },
      }),
    ...(theme.fidelity === 'medium' && {
      ackground: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.6)}, ${alpha(theme.palette.action.disabledBackground, 0.6)})`,
    }),
    ...(theme.fidelity === 'medium' &&
      (theme.animations === 'high' || theme.animations === 'medium') && {
        transition: 'border-color 0.2s ease-in',
        '&:hover': {
          borderColor: theme.palette.primary.light,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.8)}, ${alpha(theme.palette.action.disabledBackground, 0.6)})`,
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.text.primary,
        },
        '&.Mui-selected': {
          color: theme.palette.secondary.main,
          borderColor: theme.palette.secondary.main,
          backgroundColor: alpha(theme.palette.action.active, 0.6),
          '&:hover': {
            color: theme.palette.secondary.dark,
            borderColor: theme.palette.secondary.dark,
            backgroundColor: theme.palette.action.disabled,
          },
        },
      }),
  }),
  'Contracts.ArchetypeListIcon': (theme: Theme): SxProps<Theme> => ({
    color: 'inherit',
    ...(theme.fidelity === 'high' && {
      filter: `drop-shadow(2px 1px 6px ${theme.palette.secondary.dark})`,
    }),
  }),
  'Contracts.ArchetypeListDropIcon': (theme: Theme): SxProps<Theme> => ({
    fontSize: '1.8em',
    color: theme.palette.secondary.main,
  }),
  'Contracts.ContractListButton': (theme: Theme): SxProps<Theme> => ({
    px: { xs: '.5em', md: '1em' },
    py: '.5em',
    borderLeft: '3px solid',
    borderRight: '3px solid',
    borderRadius: '10px',
    borderColor: theme.palette.action.disabled,
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.5)}, ${alpha(theme.palette.primary.dark, 0.5)})`,
    color: 'text.secondary',
    transition: 'background 0.3s ease, border-color 0.2s ease, text-shadow 0.3s ease',
    '&.Mui-selected': {
      borderColor: theme.palette.success.main,
      background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.5)}, ${alpha(theme.palette.success.dark, 0.5)})`,
      textShadow: `0 1px 8px ${theme.palette.background.paper}`,
      '&.MuiTouchRipple-child': {
        bgcolor: theme.palette.primary.dark,
        color: theme.palette.secondary.light,
      },
    },
  }),
};
