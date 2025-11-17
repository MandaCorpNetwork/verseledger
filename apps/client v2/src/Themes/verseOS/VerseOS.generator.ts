import '@Assets/Css/fonts.css';

import type { Animations, Fidelity } from '@Types/themes/themeTypes';
import { createTheme, type Theme, type ThemeOptions } from '@mui/material';

export const generateVerseOS = (
  palette: Theme,
  fidelity: Fidelity,
  animations: Animations,
  transitions: ThemeOptions['transitions'],
) => {
  const isHigh = ['ultra', 'high'].includes(fidelity);
  const isMedium = fidelity === 'medium';

  return createTheme({
    palette: palette.palette,
    fidelity,
    animations,
    ...transitions,
    shape: {
      borderRadius: 10,
    },
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
      fontFamily: ['Jura', 'Saira Semi Condensed', 'Arial', 'sans-serif'].join(','),
      h1: {
        fontFamily: 'Alenia',
      },
      h2: {
        fontFamily: 'Alenia',
      },
      h3: {
        fontFamily: 'Aldrich',
      },
      h4: {
        fontFamily: 'Aldrich',
      },
      h5: {
        fontFamily: 'Aldrich',
      },
      h6: {
        fontFamily: 'Aldrich',
      },
      subtitle1: {
        fontFamily: 'cigOptical',
        wordSpacing: '2px',
      },
      subtitle2: {
        fontFamily: 'cigOptical',
      },
      overline: {
        fontFamily: 'cigOptical',
        wordSpacing: '2px',
      },
      body1: {
        fontFamily: 'Jura',
      },
      body2: {
        fontFamily: 'Jura',
      },
      button: {
        fontFamily: 'Anita',
      },
      caption: {
        fontFamily: 'cigOptical',
        wordSpacing: '1px',
        letterSpacing: '.2px',
      },
    },
  });
};
