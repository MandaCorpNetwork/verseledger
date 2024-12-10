import { LoadingWheel } from '@CommonLegacy/LoadingObject/LoadingWheel';
import { ThemeOptions } from '@mui/material';
import { createTheme, Theme } from '@mui/material/styles';

export const generatePirateOSBase = (
  palette: Theme,
  fidelity: ThemeFidelity,
  animations: ThemeAnimations,
  transtions: ThemeOptions['transitions'],
) => {
  const colors = palette.palette;
  return createTheme({
    themeType: 'pirateOS',
    palette: palette.palette,
    fidelity,
    animations,
    ...transtions,
    shape: {
      borderRadius: 0,
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
              background: colors.divider,
              borderRadius: '2px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: colors.secondary.main,
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
                borderColor: colors.action.disabled,
              },
            },
          },
          {
            props: { variant: 'contained' },
            style: {
              border: '2px solid',
              '&.Mui-disabled': {
                borderColor: colors.action.disabled,
                backgroundColor: colors.action.disabledBackground,
              },
            },
          },
        ],
      },
    },
  });
};
