import '@Assets/Css/fonts.css';
import '@mui/material/Divider';
import '@mui/material/Button';
import '@mui/material/Typography';
import '@mui/material/Box';
import '@mui/material/ListItemButton';

import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Divider' {
  interface DividerPropsVariantOverrides {
    ToolTitle: true;
    ComponentTitle: true;
  }
}

declare module '@mui/material/ListItemButton' {
  interface ListItemButtonPropsVariantOverrides {
    formItemSelect: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    popupButton: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    tip: true;
    paragraph: true;
    error: true;
    dropDown: true;
  }
}

export const verseOSTheme = createTheme({
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
      default: 'rgb(0, 1, 19)',
      //default: 'white', //Theme Test Switch
    },
    primary: {
      main: 'rgb(14,35,141)',
      dark: 'rgb(8,22,80)',
      light: 'rgb(33,150,243)',
    },
    secondary: {
      main: 'rgb(24, 252, 252)',
      dark: 'rgb(6,86,145)',
      light: 'rgb(121,192,244)',
    },
    text: {
      primary: 'rgb(211, 250, 254)',
      secondary: 'rgb(33, 150, 243)',
      disabled: 'rgb(100,100,100)',
    },
    info: {
      main: 'rgb(255, 141, 15)',
      dark: 'rgb(181,180,5)',
      light: 'rgb(255,181,100)',
      contrastText: 'rgb(35,35,35)',
    },
    success: {
      main: 'rgb(8, 201, 11)',
      dark: 'rgb(14,140,11)',
      light: 'rgb(83,217,84)',
    },
    warning: {
      main: 'rgb(255,193,0)',
      dark: 'rgb(181,137,4)',
      light: 'rgb(247,207,87)',
      contrastText: 'rgb(50,50,20)',
    },
    error: {
      main: 'rgb(255,0,0)',
      dark: 'rgb(140,0,0)',
      light: 'rgb(255,100,100)',
      contrastText: 'rgb(255,160,160)',
    },
    action: {
      disabled: 'rgb(0,73,130)',
      disabledBackground: 'rgb(0,30,100)',
    },
    divider: 'rgb(24, 252, 252)',
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
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'tip' },
          style: {
            color: 'rgb(255,141,15)',
            fontSize: '.7em',
            boxShadow: '0 4px 8px rgba(0,0,0,.4)',
            backgroundImage:
              'linear-gradient(135deg, rgba(255, 141, 15, 0.2), rgba(255, 255, 255, 0.1))',
            borderRadius: '10px',
            cursor: 'default',
            textShadow: '0 0 5px rgba(0,0,0)',
            display: 'inline-block',
          },
        },
        {
          props: { variant: 'paragraph' },
          style: {
            textWrap: 'wrap',
            whiteSpace: 'normal',
            wordBreak: 'break-all',
          },
        },
        {
          props: { variant: 'error' },
          style: {
            color: 'rgb(255,0,8)',
            fontWeight: 'bold',
            fontSize: '.8em',
            backgroundImage:
              'linear-gradient(135deg, rgba(190,0,0,.4), rgba(50,50,50,.5))',
            borderRadius: '8px',
            cursor: 'default',
            display: 'inline-block',
            textShadow: '0 0 6px rgba(0,0,0), 0 0 2px rgba(255,0,0,.4)',
            boxShadow: '0 4px 10px rgba(0,0,0,.6), 0 2px 6px rgba(255,0,0,.4)',
          },
        },
        {
          props: { variant: 'dropDown' },
          style: {
            display: 'flex',
            flexDirection: 'row',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
            textShadow: '0 0 5px rgba(33,150,243,.3)',
            '&:hover': {
              color: 'text.primary',
              cursor: 'pointer',
              textShadow: '0 0 5px rgba(255,255,245,.6)',
            },
          },
        },
      ],
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: '8px',
          borderRadius: '5px',
          backgroundColor: 'rgba(6,86,145,.5)',
          border: '2px solid rgba(14,49,252,.5)',
          boxShadow:
            '0 4px 8px rgba(0,0,0,0.4), 0 8px 16px rgba(0,0,0,0.3), 0 6px 12px rgba(0,0,0,0.2), 0 0 4px rgba(24,252,252,0.5)',
          position: 'relative',
        },
        bar: {
          borderRadius: '5px',
          backgroundColor: 'rgb(24,252,252)',
          boxShadow: '0 0 10px 2px rgba(24,252,252)',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          boxShadow: '0 0 15px 2px #0e318d',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        head: {
          '& th': {
            backgroundColor: 'rgba(0,1,19)',
            color: 'rgb(24,252,252)',
            textAlign: 'center',
            borderBottom: '2px solid rgb(121, 192, 244)',
          },
        },
        root: {
          '&.MuiTableRow-hover:hover': {
            backgroundColor: 'rgb(8, 22, 80)',
            boxShadow: '0 0 10px 2px rgb(33, 150, 243)',
          },
          '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: 'red',
          },
          '&.MuiTableRow-selected': {
            backgroundColor: 'red',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&[type="number"]::-webkit-outer-spin-button, &[type="number"]::-webkit-inner-spin-button':
            {
              '-webkit-appearnce': 'none',
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
            background: 'linear-gradient(45deg, rgba(8,22,80) 30%, rgba(24,65,180) 90%)',
            textShadow: '0 4px 8px rgba(255,255,255,.2), 0 2px 3px rgba(0,0,0,.8)',
            fontWeight: 'bold',
            boxShadow: '0 4px 8px rgba(0,0,0,.7), 0 8px 16px rgba(0,0,0,.4)',
            transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
              background: 'linear-gradient(45deg, rgba(0,1,19) 30%, rgba(0,30,100) 90%)',
              borderColor: 'rgba(14,35,141)',
              transform: 'translateY(2px)',
              boxShadow: '0 6px 12px rgba(0,0,0,.6), 0 12px 24px rgba(0,0,0,.3)',
            },
            '&:active': {
              background:
                'linear-gradient(45deg, rgba(14,35,141) 40%, rgba(33,150,243) 80%)',
              borderColor: 'rgba(0,15,80)',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,.5)',
            },
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
          borderColor: 'rgba(33,150,243)',
          '&:hover:focus': {
            borderColor: 'red',
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
          backdropFilter: 'blur(10px)',
          boxShadow:
            '0px 4px 6px -1px rgba(0, 0, 0, 0.6), 0px 8px 10px 0px rgba(0, 0, 0, 0.4), 0px 10px 20px 0px rgba(0, 0, 0, 0.3)',
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
    MuiBadge: {
      styleOverrides: {
        colorError: {
          color: 'rgb(255,255,255)',
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgb(0,0,0)',
        },
      },
    },
  },
});
