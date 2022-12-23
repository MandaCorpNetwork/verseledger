import React from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MyMenu } from './Common/MyMenu';
import { MyAppBar } from './Common/MyAppBar';
const darkTheme = createTheme({
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
      900: '#001B2F'
    },
    secondary: {
      main: '#019be5',
      dark: '#006db3',
      light: '#63ccff'
    },
    text: {
      primary: '#EAF7FF',
      secondary: '#D9ECFF',
      disabled: '#BBD5FF'
    }
  },
});
export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MyAppBar />
      <main>This app is using the dark mode</main>
      <MyMenu
        body="This is some Text"
        buttonText="I Agree"
        header="Do you agree to the thing"
        onSubmit={() => alert('You have agreed!')}
      />
    </ThemeProvider>
  );
}
