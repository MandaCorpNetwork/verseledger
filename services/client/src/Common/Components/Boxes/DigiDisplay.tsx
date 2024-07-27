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
  boxShadow: '0 3px 10px rgba(0,0,0,.3)',
  transition: 'all 0.3s ease-in-out',
  color: theme.palette.text.secondary,
  '&:hover': {
    boxShadow: '0 6px 20px rgba(0,0,0,.4)',
    backdropFilter: 'blur(10px)',
    color: theme.palette.secondary.main,
  },
}));

export default DigiDisplay;
