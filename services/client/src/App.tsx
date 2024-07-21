import './App.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
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
  return (
    <ThemeProvider theme={verseOSTheme}>
      <SnackbarProvider maxSnack={4}>
        <DndProvider backend={HTML5Backend}>
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
