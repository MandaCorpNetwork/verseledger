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
