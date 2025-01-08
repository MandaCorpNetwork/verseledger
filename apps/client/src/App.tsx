import './App.css';

import { baseThemesMap } from '@Common/Definitions/Themes/themeMaps';
import type {
  ThemeAnimations,
  ThemeFidelity,
  ThemeType,
} from '@Common/Definitions/Themes/themeTypes';
import { animationTransitionMap } from '@Common/Definitions/Themes/transitions';
import { LoadingScreen } from '@CommonLegacy/LoadingObject/LoadingScreen';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppSelector } from '@Redux/hooks';
import { selectUserSettings } from '@Redux/Slices/Auth/auth.selectors';
import { SnackbarProvider } from 'notistack';
import { useEffect, useMemo, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { AuthManager } from './AuthManager';
import { routingInfo } from './Routes/Router';

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

  const settings = useAppSelector(selectUserSettings);
  const userAnimations = settings.animations ?? 'medium';
  const userFidelity = settings.quality ?? 'medium';

  const theme = useMemo(() => {
    const animations = userAnimations as ThemeAnimations;
    const fidelity = userFidelity as ThemeFidelity;
    const themeType = (settings.theme ?? 'verseOS') as ThemeType;

    const basePalette = baseThemesMap[themeType].palette;
    const palette = createTheme({
      ...basePalette,
      //...userPalette
    });

    const transitionsObject =
      animationTransitionMap[animations] || animationTransitionMap.medium;

    return baseThemesMap[themeType].generator(
      palette,
      fidelity,
      animations,
      transitionsObject,
    );
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
