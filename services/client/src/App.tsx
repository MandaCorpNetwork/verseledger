import './App.css';

import { LoadingScreen } from '@Common/LoadingObject/LoadingScreen';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import SoundInitializer from '@Utils/Hooks/soundInitializer';
import { SnackbarProvider } from 'notistack';
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthManager } from './AuthManager';
import { PopupManager } from './PopupManager';
import { routingInfo } from './Routes/Router';
import { verseOSTheme } from './Themes/VerseOS';
import { WidgetManager } from './WidgetManager';

const router = createBrowserRouter(routingInfo);

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);
  return (
    <ThemeProvider theme={verseOSTheme}>
      <SnackbarProvider maxSnack={4}>
        <DndProvider backend={HTML5Backend}>
          {loading && <LoadingScreen variant="wheel" controlType="indeterminate" />}
          <SoundInitializer />
          <CssBaseline />
          <RouterProvider router={router} />
          <PopupManager />
          <WidgetManager />
          <AuthManager />
        </DndProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
