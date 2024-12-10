import '@Assets/Css/fonts.css';

import { LoadingWheel } from '@CommonLegacy/LoadingObject/LoadingWheel';
import type {} from '@mui/lab/themeAugmentation';
import { createTheme } from '@mui/material';

export const pirateOSPalette = createTheme({
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
});

export const pirateOS = createTheme(pirateOSPalette, {
  themeType: 'pirateOS',
  palette: pirateOSPalette.palette,
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1850,
      xl: 3040,
    },
  },
  typography: {
    fontFamily: `'Exo', 'Roboto', 'Doto', 'Electrolize', sans-serif`,
    h1: {
      fontFamily: `'Electrolize', 'Aldrich'`,
      cursor: 'default',
    },
    h2: {
      fontFamily: `'Electrolize', 'Aldrich'`,
      cursor: 'default',
    },
    h3: {
      fontFamily: `'Electrolize', 'Aldrich'`,
      cursor: 'default',
    },
    h4: {
      fontFamily: `'Electrolize', 'Aldrich'`,
      cursor: 'default',
    },
    h5: {
      fontFamily: `'Electrolize', 'Aldrich'`,
      cursor: 'default',
    },
    h6: {
      fontFamily: `'Electrolize', 'Aldrich'`,
      cursor: 'default',
    },
    subtitle1: {
      fontFamily: 'Doto',
      cursor: 'default',
    },
    subtitle2: {
      fontFamily: 'Doto',
      cursor: 'default',
    },
    overline: {
      fontFamily: 'Exo',
      cursor: 'default',
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
      cursor: 'default',
    },
    caption: {
      fontFamily: 'Doto',
      cursor: 'default',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          '&::-webkit-scrollbar': {
            width: '2px',
            height: '2px',
          },
          '&::-webkit-scrollbar-track': {
            background: pirateOSPalette.palette.divider,
            borderRadius: '2px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: pirateOSPalette.palette.secondary.main,
          },
        },
      },
    },
    MuiLoadingButton: {
      defaultProps: {
        variant: 'outlined',
        loadingIndicator: <LoadingWheel logoSize={20} wheelSize={35} />,
        loadingPosition: 'center',
        color: 'secondary',
        size: 'medium',
      },
      styleOverrides: {
        root: {
          display: 'inline-flex',
          maxHeight: 'fit-content',
          maxWidth: 'fit-content',
          cursor: 'pointer',
          borderRadius: 0,
        },
      },
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            '&.Mui-disabled': {
              borderColor: pirateOSPalette.palette.action.disabled,
            },
          },
        },
        {
          props: { variant: 'contained' },
          style: {
            border: '2px solid',
            '&.Mui-disabled': {
              borderColor: pirateOSPalette.palette.action.disabled,
              backgroundColor: pirateOSPalette.palette.action.disabledBackground,
            },
          },
        },
      ],
    },
  },
});
