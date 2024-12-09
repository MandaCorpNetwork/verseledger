import './App.css';

import { baseThemesMap, ThemeName } from '@Common/Definitions/themes';
import { animationTransitionMap } from '@Common/Definitions/transitions';
import { LoadingScreen } from '@CommonLegacy/LoadingObject/LoadingScreen';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppSelector } from '@Redux/hooks';
import { selectUserSettings } from '@Redux/Slices/Auth/auth.selectors';
import { SnackbarProvider } from 'notistack';
import { useEffect, useMemo, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthManager } from './AuthManager';
import { routingInfo } from './Routes/Router';

const router = createBrowserRouter(routingInfo);

const isValidAnimation = (value: string): value is 'high' | 'medium' | 'low' | 'none' =>
  ['high', 'medium', 'low', 'none'].includes(value);
const isValidFidelity = (value: string): value is 'high' | 'medium' | 'low' | 'potato' =>
  ['high', 'medium', 'low', 'potato'].includes(value);

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

  const settings = useAppSelector(selectUserSettings);
  const userAnimations = settings.animations ?? 'medium';
  const userFidelity = settings.quality ?? 'medium';

  const theme = useMemo(() => {
    const animations = isValidAnimation(userAnimations) ? userAnimations : 'medium';
    const fidelity = isValidFidelity(userFidelity) ? userFidelity : 'medium';
    const themeName = (settings.theme ?? 'verseOS') as ThemeName;
    const baseTheme = baseThemesMap[themeName] || baseThemesMap.verseOS;

    const transitionsObject =
      animationTransitionMap[animations] || animationTransitionMap.medium;

    return createTheme({
      ...baseTheme,
      animations,
      fidelity,
      transitions: transitionsObject,
    });
  }, [settings.theme, userAnimations, userFidelity]);
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={4}>
        <DndProvider backend={HTML5Backend}>
          {loading && <LoadingScreen variant="wheel" controlType="indeterminate" />}
          <CssBaseline />
          <RouterProvider router={router} />
          <AuthManager />
        </DndProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
