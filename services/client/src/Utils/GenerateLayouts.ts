import { baseThemesMap } from '@Common/Definitions/Themes/themeMaps';
import { SxProps, Theme } from '@mui/material/styles';

export const generateLayout = (
  theme: Theme,
  componentKey: string,
): SxProps<Theme> | undefined => {
  const themeType = theme.themeType;
  if (!themeType) return;
  const layout = baseThemesMap[themeType].styledComponents[componentKey];

  if (!layout) return;
  if (typeof layout === 'function') {
    return { ...layout(theme) } as SxProps<Theme>;
  }
  if (typeof layout === 'object') {
    return { ...layout } as SxProps<Theme>;
  }
};
