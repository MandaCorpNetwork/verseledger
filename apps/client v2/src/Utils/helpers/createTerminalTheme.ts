import { terminalStore } from '@Store/terminal/terminalStore';
import { createTheme } from '@mui/system';
import { useStore } from '@tanstack/react-store';
import { useMemo } from 'react';

export const useTerminalTheme = () => {
  const { style } = useStore(terminalStore);

  return useMemo(() => {
    return createTheme({
      palette: {
        mode: 'dark',
        primary: { main: style.fontColor },
        secondary: { main: style.warningColor },
        error: { main: style.errorColor },
        success: { main: style.successColor },
        info: { main: style.infoColor },
        background: { default: style.background || 'rgb(0,1,19)' },
        text: { primary: style.fontColor },
      },
      typography: {
        fontFamily: style.font,
        fontSize: parseInt(style.fontSize),
        allVariants: {
          color: style.fontColor,
        },
      },
      components: {
        MuiTypography: {
          styleOverrides: {
            root: {
              letterSpacing: '0.5px',
              textShadow: style.glow ? `0 0 8px ${style.glow}` : undefined,
            },
          },
        },
      },
    });
  }, [style]);
};
