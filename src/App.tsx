import './App.css';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const darkTheme = createTheme({
  components: {
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
          borderColor: '#18fcfc',
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
  },

  palette: {
    background: {
      default: '#000113',
      //default: 'white', //Theme Test Switch
    },
    primary: {
      main: '#0e318d',
      dark: '#081d44',
      light: '#2196f3',
    },
    secondary: {
      main: '#18fcfc',
      dark: '#065691',
      light: '#79c0f4',
    },
    text: {
      primary: '#d3fafe',
      secondary: '#2196f3',
      disabled: '#020226',
    },
    info: {
      main: '#ff8d0f',
    },
    success: {
      main: '#08c90b',
    },
    warning: {
      main: '#ff8d0f',
    },
    error: {
      main: '#ff0008',
    },
  },
});
import { routingInfo } from './Routes/Router';
const router = createBrowserRouter(routingInfo);
export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <SnackbarProvider maxSnack={4}>
        <CssBaseline />
        <RouterProvider router={router} />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
