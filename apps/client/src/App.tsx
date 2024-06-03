import './App.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthManager } from './AuthManager';
import { PopupManager } from './PopupManager';
import { routingInfo } from './Routes/Router';
import { verseOSTheme } from './Themes/VerseOS';

const router = createBrowserRouter(routingInfo);

export default function App() {
  return (
    <ThemeProvider theme={verseOSTheme}>
      <SnackbarProvider maxSnack={4}>
        <CssBaseline />
        <RouterProvider router={router} />
        <PopupManager />
        <AuthManager />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
