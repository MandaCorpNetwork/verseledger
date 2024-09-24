import { Box, styled } from '@mui/material';

export const TuningTick = styled(Box)(({ theme }) => ({
  borderRadius: '5px',
  width: '35px',
  height: '20px',
  backgroundColor: theme.palette.secondary.dark,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    border: '1px solid',
    borderColor: theme.palette.secondary.light,
  },
}));
