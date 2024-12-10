import { createTheme } from '@mui/material';

export const verseOSPalette = createTheme({
  palette: {
    tonalOffset: {
      dark: 0.9,
      light: 0.1,
    },
    background: {
      default: 'rgb(0, 1, 19)',
      paper: 'rgb(10, 10, 30)',
      //default: 'white', //Theme Test Switch
    },
    primary: {
      main: 'rgb(14,35,141)',
      dark: 'rgb(8,22,80)',
      light: 'rgb(33,150,243)',
    },
    secondary: {
      main: 'rgb(0, 204, 252)',
      dark: 'rgb(0,102,204)',
      light: 'rgb(121,192,244)',
    },
    text: {
      primary: 'rgb(211, 250, 254)',
      secondary: 'rgb(33, 150, 243)',
      disabled: 'rgb(100,100,100)',
    },
    info: {
      main: 'rgb(100, 200, 255)',
      light: 'rgb(150, 220, 255)',
      dark: 'rgb(50, 150, 255)',
      contrastText: 'rgb(20, 20, 20)',
    },
    success: {
      main: 'rgb(8, 201, 11)',
      light: 'rgb(83, 217, 84)',
      dark: 'rgb(14, 140, 11)',
    },
    warning: {
      main: 'rgb(255, 193, 0)',
      light: 'rgb(247, 207, 87)',
      dark: 'rgb(181, 137, 4)',
      contrastText: 'rgb(50, 50, 20)',
    },
    error: {
      main: 'rgb(255, 0, 0)',
      light: 'rgb(255, 100, 100)',
      dark: 'rgb(140, 0, 0)',
      contrastText: 'rgb(255, 160, 160)',
    },
    action: {
      active: 'rgb(0, 120, 255)',
      hover: 'rgb(30, 90, 200)',
      selected: 'rgb(0, 200, 255)',
      disabled: 'rgb(0,73,130)',
      disabledBackground: 'rgb(0,30,100)',
    },
    divider: 'rgb(24, 252, 252)',
  },
});
