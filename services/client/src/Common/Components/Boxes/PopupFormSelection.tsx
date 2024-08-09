import { Box, styled } from '@mui/material';

export const PopupFormSelection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderLeft: '3px solid',
  borderRight: '3px solid',
  borderColor: 'rgba(0,30,150,.8)',
  borderRadius: '5px',
  borderTop: '1px solid rgb(0,30,100)',
  borderBottom: '1px solid rgb(0,30,100)',
  boxShadow: '0 0 10px rgba(0,0,0,.8)',
  backgroundImage: 'linear-gradient(145deg, rgba(0,73,130,.3), rgba(8,22,80,0.77))',
  color: theme.palette.text.secondary,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    borderColor: 'rgb(24, 252, 252)',
    borderTop: '1px solid rgb(0,30,100)',
    borderBottom: '1px solid rgb(0,30,100)',
    boxShadow: '0 0 10px 5px rgb(0,30,100)',
    color: theme.palette.secondary.main,
  },
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
}));
