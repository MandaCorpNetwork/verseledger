import React from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@mui/material/CssBaseline';
import { VLAppBar } from './Common/AppBar';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './Routes/Home/Home';
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
      default: '#002744',
    },
    primary: {
      main: '#1976d2',
      light: '#63a4ff',
      dark: '#004ba0',
      50: '#B4DEFF',
      100: '#95D1FF',
      200: '#6BBFFF',
      300: '#2FA5FF',
      400: '#007BDA',
      500: '#003964',
      600: '#002F53',
      700: '#002744',
      800: '#002039',
      900: '#001B2F',
    },
    secondary: {
      main: '#019be5',
      dark: '#006db3',
      light: '#63ccff',
    },
    text: {
      primary: '#EAF7FF',
      secondary: '#D9ECFF',
      disabled: '#BBD5FF',
    },
  },
});
import { routingInfo } from "./Routes/Router";
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
