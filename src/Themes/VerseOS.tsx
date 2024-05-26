import '@mui/material/Divider';
import '@mui/material/Button';

import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Divider' {
  interface DividerPropsVariantOverrides {
    ToolTitle: true;
    ComponentTitle: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    popupButton: true;
  }
}

export const verseOSTheme = createTheme({
  palette: {
    background: {
      default: 'rgb(0, 1, 19)',
      //default: 'white', //Theme Test Switch
    },
    primary: {
      main: 'rgb(14, 49, 141)',
      dark: 'rgb(8, 29, 68)',
      light: 'rgb(33, 150, 243)',
    },
    secondary: {
      main: 'rgb(24, 252, 252)',
      dark: 'rgb(6, 86, 145)',
      light: 'rgb(121, 192, 244)',
    },
    text: {
      primary: 'rgb(211, 250, 254)',
      secondary: 'rgb(33, 150, 243)',
      disabled: 'rgb(0, 30, 100)',
    },
    info: {
      main: 'rgb(255, 141, 15)',
    },
    success: {
      main: 'rgb(8, 201, 11)',
    },
    warning: {
      main: 'rgb(255, 141, 15)',
    },
    error: {
      main: 'rgb(255, 0, 8)',
    },
    action: {
      disabled: 'rgb(0, 56, 180)',
      disabledBackground: 'rgb(0, 30, 100)',
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&[type="number"]::-webkit-outer-spin-button, &[type="number"]::-webkit-inner-spin-button':
            {
              '-webkit-appearance': 'none',
              margin: 0,
            },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: 'rgb(24, 252, 252)',
          '&.Mui-disabled': {
            color: 'rgb(8, 29, 68)',
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'popupButton' },
          style: {
            borderLeft: '3px solid',
            borderRight: '3px solid',
            borderColor: 'rgb(24,252,252)',
            borderRadius: '5px',
            backgroundColor: 'rgb(14,49,141)',
            '&.Mui-disabled': {
              borderColor: 'rgb(6,86,145)',
              backgroundColor: 'rgb(0,30,100)',
            },
          },
        },
      ],
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: 'rgb(24, 252, 252)',
          '&.Mui-disabled': {
            color: 'rgb(8, 29, 68)',
          },
        },
      },
    },
    MuiDivider: {
      variants: [
        {
          props: { variant: 'ToolTitle' },
          style: {
            borderColor: '#18fcfc',
            boxShadow:
              ' 0 0 4px rgba(255, 141, 15, 0.2), 0 0 0 2px rgba(24, 252, 252, .4), 0 0 0 1px rgba(24, 252, 252, .6)',
            width: 'calc(100% - 30%)',
          },
        },
        {
          props: { variant: 'ComponentTitle' },
          style: {
            borderColor: '#18fcfc',
            boxShadow:
              ' 0 0 3px rgba(121, 192, 244, 0.25), 0 0 0 1px rgba(24, 252, 252, .5)',
            width: 'calc(100% - 30%)',
          },
        },
      ],
    },
    MuiStepLabel: {
      styleOverrides: {
        root: {},
        label: {
          fontSize: '.8em',
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        wave: {
          '&:after': {
            animation: 'animation-wiooy9 2s linear 0.5s infinite',
            background:
              'linear-gradient( 90deg, transparent, rgba(24, 252, 252, 0.1), transparent )', //(Check this color later for more vibrance to the skeleton animation)
            //'linear-gradient( 90deg, transparent, rgba(211, 250, 254, 0.08), transparent )',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '0',
          '&:last-child': {
            paddingBottom: '0',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#003964',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderColor: '#065691',
          backgroundColor: '#0E318D',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          position: 'absolute',
          top: 'calc(100%)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#0E318D',
        },
        root: {
          '&:hover $notchedOutline': {
            borderColor: '#0E318D',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        iconOutlined: {
          fill: '#0E318D',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(14, 49, 141, .8)',
          boxShadow:
            '.5px 2px 3px -1px rgba(24,252,252,0.2), 0px 1px 3px 0px rgba(24,252,252,0.14), 0px 1.3px 3px 0px rgba(24,252,252,0.12)',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        groupLabel: {
          backgroundColor: 'rgb(14, 49, 141, .8)',
        },
        listbox: {
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgb(8, 29, 68)',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '20px',
            background: 'rgb(121, 192, 244, .5)',
          },
          '&[aria-expanded="true"]': {
            backdropFilter: 'blur(10px)',
          },
        },
        option: {
          color: 'rgb(211, 250, 254, .5)',
          '&[aria-selected="true"]': {
            backgroundColor: 'rgb(14, 49, 141, .8)',
            color: 'rgb(211, 250, 254)',
          },
          '&:hover': {
            backgroundColor: 'rgb(8, 29, 68, .5)',
          },
        },
        clearIndicator: {
          color: 'rgb(33, 150, 243)',
          '&:hover': {
            color: '#18FCFC',
          },
        },
        popupIndicator: {
          color: 'rgb(33, 150, 243)',
          '&:hover': {
            color: '#18FCFC',
          },
        },
        tag: {
          backgroundColor: 'rgb(14, 49, 141, .8)',
          color: 'rgb(211, 250, 254, .8)',
          '& .MuiChip-deleteIcon': {
            color: 'rgb(211, 250, 254, .8)',
          },
          '&:hover': {
            '& .MuiChip-deleteIcon': {
              color: 'rgb(211, 250, 254)',
            },
          },
        },
        input: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#0e318d',
          },
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        iconFilled: {
          color: 'rgb(24, 252, 252)',
        },
        iconEmpty: {
          color: 'rgb(6, 86, 145)',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: 'rgb(121, 192, 244)',
        },
        track: {
          backgroundColor: 'rgb(6, 86, 145)',
        },
      },
    },
  },
});
