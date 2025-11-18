import { settingsStore } from '@/Store/userSettings/settingStore';
import { createAppTheme } from '@/Utils/helpers/createAppTheme';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { useStore } from '@tanstack/react-store';
import { useMemo } from 'react';
import { SnackbarProvider } from 'notistack';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export interface BaseShellProps {
  children: React.ReactNode;
}

/**
 * Base Shell is a Reusable Site Wrapper for ThemeOS' that utilize the normal UI System.
 * VLTerminal & HexOS do not utilize this component.
 */

export const BaseShell: React.FC<BaseShellProps> = ({ children }) => {
  const settings = useStore(settingsStore);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const theme = useMemo(() => {
    const effectiveAnimations = prefersReducedMotion ? 'none' : settings.animations;
    return createAppTheme({
      theme: settings.theme,
      fidelity: settings.fidelity,
      animations: effectiveAnimations,
    });
  }, [settings.theme, settings.fidelity, settings.animations, prefersReducedMotion]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={5} autoHideDuration={4000}>
        <DndProvider backend={HTML5Backend}>{children}</DndProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};
