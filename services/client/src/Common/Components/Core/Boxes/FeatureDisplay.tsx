import { alpha, Box, styled } from '@mui/material';

export const FeatureDisplay = styled(Box)(({ theme }) => [
  theme.themeType === 'verseOS' && {
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
  },
  theme.themeType === 'verseOS' &&
    theme.fidelity === 'high' && {
      boxShadow: `0 8px 12px rgba(0,0,0,0.4), 0 4px 6px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2), 0 1px 2px ${alpha(theme.palette.secondary.light, 0.2)}, 0 3px 5px ${alpha(theme.palette.secondary.light, 0.1)}`,
      backdropFilter: 'blur(5px)',
      backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.secondary.dark, 0.5)} 0%, ${alpha(theme.palette.action.disabled, 0.1)} 100%)`,
    },
  theme.themeType === 'verseOS' &&
    theme.fidelity === 'medium' && {
      boxShadow: `0 4px 6px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)`,
      backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.secondary.dark, 0.5)} 0%, ${alpha(theme.palette.action.disabled, 0.1)} 100%)`,
    },
  theme.themeType === 'verseOS' &&
    (theme.fidelity === 'low' || theme.fidelity === 'potato') && {
      backgroundColor: alpha(theme.palette.action.disabled, 0.2),
    },
  theme.themeType === 'pirateOS' && {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    padding: '0.3em 0.5em',
    overflow: 'auto',
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
  },
  theme.themeType === 'pirateOS' &&
    theme.fidelity === 'high' && {
      backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.7)} 0%, ${alpha(theme.palette.primary.dark, 0.3)} 100%)`,
      boxShadow: `4px 6px 20px rgba(0,0,0,0.5), -1px -3px 20px rgba(0,0,0,0.2), 0 0 25px ${alpha(theme.palette.primary.light, 0.2)}`,
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '50%',
        right: 0,
        bottom: 0,
        borderTop: '3px solid',
        borderBottom: '3px solid',
        boxSizing: 'border-box',
        width: '80%',
        pointerEvents: 'none',
        transform: 'translateX(-50%)',
        borderColor: theme.palette.secondary.light,
        opacity: 0.3,
      },
      '&:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        height: '80%',
        transform: 'translateY(-50%)',
        borderLeft: '3px solid',
        borderRight: '3px solid',
        boxSizing: 'border-box',
        pointerEvents: 'none',
        borderColor: theme.palette.secondary.light,
        opacity: 0.3,
      },
    },
  theme.themeType === 'pirateOS' &&
    theme.fidelity === 'medium' && {
      backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.7)}, ${alpha(theme.palette.primary.dark, 0.3)})`,
      border: '3px solid',
      borderColor: theme.palette.secondary.light,
    },
  theme.themeType === 'pirateOS' &&
    (theme.fidelity === 'low' || theme.fidelity === 'potato') && {
      backgroundColor: theme.palette.primary.light,
      border: '3px solid',
      borderColor: theme.palette.secondary.light,
    },
]);
