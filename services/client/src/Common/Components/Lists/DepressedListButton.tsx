import { ListItemButton, styled } from '@mui/material';

export const DepressedListButton = styled(ListItemButton)({
  '&:hover': {
    backgroundColor: 'rgba(33,150,243,0.1)',
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(33,150,243,0.2)',
  },
  '&.Mui-selected:hover': {
    backgroundColor: 'rgba(33,150,243,0.3)',
  },
  '&.Mui-active': {
    backgroundColor: 'rgba(33,150,243,0.4)',
    boxShadow: 'inset 0 0 10px rgba(0,1,19,0.5)',
  },
});
