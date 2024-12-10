import { SxProps } from '@mui/material';
import { alpha, Theme } from '@mui/material/styles';

export const pirateOSFeatureContainer = (theme: Theme): SxProps<Theme> => ({
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
  }),
  ...(theme.fidelity === 'medium' && {
    backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.primary.dark, 0.2)} 10%, ${alpha(theme.palette.background.paper, 0.8)} 80%)`,
  }),
});

export const pirateOSFeatureDisplay = (theme: Theme): SxProps<Theme> => ({
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
  // HIGH FIDELITY
  ...(theme.fidelity === 'high' && {
    backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.primary.light, 0.7)} 0%, ${alpha(theme.palette.primary.dark, 0.3)} 100%)`,
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
});

export const pirateOSComponentContainer = (theme: Theme): SxProps<Theme> => ({
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
  // HIGH FIDELITY
  ...(theme.fidelity === 'high' && {
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
  }),
  ...(theme.fidelity === 'high' &&
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
});
