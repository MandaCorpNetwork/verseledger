import { useTheme } from '@mui/material';
import { generateLayout } from '@Utils/GenerateLayouts';
import { useCallback } from 'react';

export const useDynamicTheme = () => {
  const theme = useTheme();

  const layout = useCallback(
    (componentKey: string) => {
      return generateLayout(theme, componentKey);
    },
    [theme],
  );

  const swap = useCallback(() => {
    //
  }, []);

  return { layout, swap };
};
