import { useMediaQuery, useTheme } from '@mui/material';

export const isTablet = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('lg'));
};
