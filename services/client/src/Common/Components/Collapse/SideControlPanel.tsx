import { Collapse, styled } from '@mui/material';

export const SideControlPanel = styled(Collapse)(({ theme }) => ({
  position: 'relative',
  borderTopRightRadius: '10px',
  borderBottomRightRadius: '10px',
  borderTop: '2px solid',
  borderBottom: '2px solid',
  borderColor: theme.palette.secondary.main,
  boxShadow: '0 2px 10px 4px rgba(24,252,252,0.25)',
  backgroundImage: 'linear-gradient(165deg, rgba(6,86,145,0.5), rgba(0,73,130,0.3))',
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
    backgroundImage: 'linear-gradient(135deg, rgba(14,49,243,0.3), rgba(8,22,80,0.5))',
    borderColor: theme.palette.secondary.light,
  },
  transition: 'all 0.5s',
}));
