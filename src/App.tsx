import './App.css';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const darkTheme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#003964',
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
      main: '#ed0008',
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
