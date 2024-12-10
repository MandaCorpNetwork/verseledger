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
