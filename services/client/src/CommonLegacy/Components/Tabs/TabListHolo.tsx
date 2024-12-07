import { styled, Tabs } from '@mui/material';

const TabListHolo = styled(Tabs)(({ theme }) => ({
  borderLeft: '2px solid',
  borderRight: '2px solid',
  borderRadius: '5px',
  borderColor: theme.palette.secondary.main,
  boxShadow: '0 0 5px 2px rgba(14,49,252,.4)',
  backgroundImage: 'linear-gradient(135deg, rgba(14,49,243,0.3), rgba(8,22,80,0.5))',
  position: 'relative',
  display: 'flex',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage:
      'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
    backgroundSize: '5px 5px',
    opacity: 0.5,
  },
  '&:hover': {
    borderColor: 'secondary.light',
    backgroundImage: 'linear-gradient(165deg, rgba(6,86,145,0.5), rgba(0,73,130,0.3))',
    boxShadow: '0 0px 5px 2px rgba(24,252,252,0.25)',
  },
  transition: 'all 0.3s',
}));

export default TabListHolo;
