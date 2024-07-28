import { Box, styled } from '@mui/material';

const DigiDisplay = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(14,49,141,.3)',
  borderRadius: '5px',
  borderTop: '1px solid',
  borderBottom: '1px solid',
  borderColor: theme.palette.primary.main,
  boxShadow:
    '0 3px 10px rgba(0,0,0,.3), 0 6px 12px rgba(0,0,0,.3), inset 0 1px 2px rgba(14,35,141,.3), inset 0 -1px 2px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  transition: 'all 0.1s ease-in-out',
  position: 'relative',
  color: theme.palette.text.secondary,
  backgroundImage:
    'linear-gradient(135deg, rgba(14,49,141,.4) 0%, rgba(8,22,80,0.4) 100%)',
  '&:hover': {
    boxShadow:
      '0 6px 12px rgba(0,0,0,.4), 0 12px 24px rgba(0,0,0,.5), inset 0 1px 2px rgba(14,35,141,.3), inset 0 -1px 2px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(10px)',
    color: theme.palette.secondary.main,
  },
}));

export default DigiDisplay;
