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
