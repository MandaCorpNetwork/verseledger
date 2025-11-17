import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, useMediaQuery } from '@mui/material';
import { useStore } from '@tanstack/react-store';
import { settingsStore } from './Store/userSettings/settingStore';
import type { Animations } from '@Common/Definitions/Types/themes/themeTypes';
import { createAppTheme } from './Themes/createAppTheme';
import { useMemo } from 'react';
import { SnackbarProvider } from 'notistack';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './Routes/routeTree';

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadDelay: 200,
  context: {
    queryClient: undefined!
  }
})

export default function App() {
  const settings = useStore(settingsStore);

  const preferReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const effectiveAnimations: Animations = preferReducedMotion
    ? 'none'
    : settings.animations;

  const theme = useMemo(
    () =>
      createAppTheme({
        theme: settings.theme,
        fidelity: settings.fidelity,
        animations: effectiveAnimations,
      }),
    [settings.theme, settings.fidelity, effectiveAnimations],
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={4}>
        <DndProvider backend={HTML5Backend}>
          <RouterProvider router={router} context={{}} />
        </DndProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
