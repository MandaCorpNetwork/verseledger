import { ListItemButton, styled } from '@mui/material';

export const DepressedListButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '5px',
  transition: 'all 0.3s',
  position: 'relative',
  overflow: 'hidden',
  color: theme.palette.text.secondary,
  textShadow: '0 0 5px rgba(121,192,244,0.5)',
  '&:hover': {
    backgroundColor: 'rgba(33,150,243,0.1)',
    boxShadow: 'inset 0 0 8px rgba(0,0,0,0.1)',
    textShadow: '0 0 7px rgba(211,250,254,0.6)',
    color: theme.palette.text.primary,
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(0,1,19,0.1)',
    boxShadow: 'inset 0 0 15px rgba(0,1,19,0.5)',
    color: theme.palette.primary.contrastText,
    textShadow: '0 0 5px rgba(255,255,255,0.8)',
  },
  '&.Mui-selected:hover': {
    backgroundColor: 'rgba(33,150,243,0.3)',
    boxShadow: 'inset 0 0 20px rgba(0,1,19,0.7)',
    textShadow: '0 0 7px rgba(255,255,255,0.9)',
  },
  '&.Mui-active': {
    backgroundColor: 'rgba(33,150,243,0.4)',
    boxShadow: 'inset 0 0 20px rgba(0,1,19,0.7)',
  },
}));
