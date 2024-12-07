import '@Assets/Css/fonts.css';

import { createTheme } from '@mui/material';

// refinerySystemC47.02
export const refinerySystem = createTheme({
  themeType: 'refinerySystem',
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
    background: {
      default: 'rgb(10, 10, 10)',
      paper: 'rgb(20, 20, 20)',
    },
    primary: {
      main: 'rgb(255, 102, 0)',
      light: 'rgb(255, 140, 0)',
      dark: 'rgb(180, 70, 0)',
      contrastText: 'rgb(255, 255, 255)',
    },
    secondary: {
      main: 'rgb(220, 0, 0)',
      light: 'rgb(255, 60, 60)',
      dark: 'rgb(120, 0, 0)',
      contrastText: 'rgb(255, 255, 255)',
    },
    text: {
      primary: 'rgb(230, 230, 230)',
      secondary: 'rgb(180, 180, 180)',
      disabled: 'rgb(100, 100, 100)',
    },
    info: {
      main: 'rgb(255, 165, 0)',
      light: 'rgb(255, 190, 120)',
      dark: 'rgb(180, 120, 0)',
      contrastText: 'rgb(35, 35, 35)',
    },
    success: {
      main: 'rgb(0, 150, 0)',
      light: 'rgb(0, 200, 0)',
      dark: 'rgb(0, 100, 0)',
    },
    warning: {
      main: 'rgb(255, 165, 0)',
      light: 'rgb(255, 200, 100)',
      dark: 'rgb(180, 120, 0)',
      contrastText: 'rgb(35, 35, 35)',
    },
    error: {
      main: 'rgb(255, 0, 0)',
      light: 'rgb(255, 100, 100)',
      dark: 'rgb(120, 0, 0)',
      contrastText: 'rgb(255, 255, 255)',
    },
    action: {
      active: 'rgb(255, 102, 0)',
      hover: 'rgb(255, 140, 0)',
      selected: 'rgb(255, 153, 0)',
      disabled: 'rgb(60, 60, 60)',
      disabledBackground: 'rgb(20, 20, 20)',
    },
    divider: 'rgb(50, 50, 50)',
  },
});
