import { createTheme } from '@mui/material';

export const pirateOsTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1850,
      xl: 3040,
    },
  },
  palette: {
    tonalOffset: {
      dark: 0.9,
      light: 0.1,
    },
  },
});
