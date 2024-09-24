import { Box, styled } from '@mui/material';

export const TuningTick = styled(Box)(({ theme }) => ({
  borderRadius: '5px',
  width: '35px',
  height: '20px',
  backgroundColor: theme.palette.secondary.dark,
  cursor: 'pointer',
  transition: 'backgroundColor 0.2s ease-in-out',
  boxShadow: '0 4px 8px rgba(0,0,0,.6)',
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    border: '1px solid',
    borderColor: theme.palette.secondary.light,
  },
}));
