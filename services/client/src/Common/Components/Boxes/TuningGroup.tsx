import { Box, styled } from '@mui/material';

export const TuningGroup = styled(Box)(({ theme }) => ({
  borderRadius: '5px',
  width: '45px',
  height: '30px',
  backgroundColor: theme.palette.secondary.dark,
  border: '2px solid',
  borderColor: theme.palette.primary.light,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.light,
  },
}));
