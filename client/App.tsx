import React from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@mui/material/CssBaseline';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
const darkTheme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#003964',
        },
      },
    },
  },
  palette: {
    background: {
      default: '#000113',
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
      disabled: '#00013',
    },
    info: {
      main: '#ff8d0f'
    },
    success: {
      main: '#08c90b'
    },
    warning: {
      main: '#ed0008'
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
