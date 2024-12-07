import '@Assets/Css/fonts.css';

import { createTheme } from '@mui/material';

export const pirateOS = createTheme({
  themeType: 'pirateOS',
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
      default: 'rgb(27,27,31)',
      paper: 'rgb(42,42,48)',
    },
    primary: {
      main: 'rgb(178,34,52)',
      light: 'rgb(214,58,72)',
      dark: 'rgb(128,17,30)',
      contrastText: 'rgb(240,230,210)',
    },
    secondary: {
      main: 'rgb(137,111,71)',
      light: 'rgb(180,156,109)',
      dark: 'rgb(95,75,46)',
      contrastText: 'rgb(240, 230, 210)',
    },
    text: {
      primary: 'rgb(240, 230, 210)',
      secondary: 'rgb(184, 166, 145)',
      disabled: 'rgb(98, 90, 78)',
    },
    info: {
      main: 'rgb(70, 126, 195)',
      light: 'rgb(111, 161, 224)',
      dark: 'rgb(48, 86, 134)',
    },
    success: {
      main: 'rgb(57, 131, 110)',
      light: 'rgb(83, 162, 131)',
      dark: 'rgb(40, 86, 73)',
    },
    warning: {
      main: 'rgb(219, 142, 40)',
      light: 'rgb(255, 199, 100)',
      dark: 'rgb(162, 96, 20)',
    },
    error: {
      main: 'rgb(140, 35, 35)',
      light: 'rgb(185, 58, 58)',
      dark: 'rgb(98, 25, 25)',
    },
    action: {
      active: 'rgb(240, 230, 210)',
      hover: 'rgb(74, 74, 79)',
      selected: 'rgb(178, 34, 52)',
      disabled: 'rgb(98, 90, 78)',
      disabledBackground: 'rgb(42, 42, 48)',
    },
    divider: 'rgb(74, 74, 79)',
  },
  typography: {
    fontFamily: `'Exo', 'Roboto', 'Doto', 'Electrolize', sans-serif`,
    h1: {
      fontFamily: `'Electrolize', 'Aldrich'`,
    },
    h2: {
      fontFamily: `'Electrolize', 'Aldrich'`,
    },
    h3: {
      fontFamily: `'Electrolize', 'Aldrich'`,
    },
    h4: {
      fontFamily: `'Electrolize', 'Aldrich'`,
    },
    h5: {
      fontFamily: `'Electrolize', 'Aldrich'`,
    },
    h6: {
      fontFamily: `'Electrolize', 'Aldrich'`,
    },
    subtitle1: {
      fontFamily: 'Doto',
    },
    subtitle2: {
      fontFamily: 'Doto',
    },
    overline: {
      fontFamily: 'Exo',
    },
    body1: {
      fontFamily: 'Exo',
    },
    body2: {
      fontFamily: 'Roboto',
    },
    button: {
      fontFamily: 'Doto',
      fontWeight: 'bold',
    },
    caption: {
      fontFamily: 'Doto',
    },
  },
});
