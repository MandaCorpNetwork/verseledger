import { baseThemesMap } from '@Common/Definitions/Themes/themeMaps';
import { SxProps, Theme } from '@mui/material/styles';

import { Logger } from './Logger';

export const generateStyles = (
  theme: Theme,
  defaultStyles: SxProps<Theme>,
  component: string,
): SxProps<Theme> => {
  const customStyles =
    baseThemesMap[theme.themeType ?? 'verseOS'].styledComponents[component];

  if (!customStyles) return defaultStyles;
  if (typeof customStyles === 'function') {
    return { ...defaultStyles, ...customStyles(theme) } as SxProps<Theme>;
  }
  if (typeof customStyles === 'object') {
    return { ...defaultStyles, ...customStyles } as SxProps<Theme>;
  }

  Logger.warn(
    `Invalid styles for component "${component}" in theme "${theme.themeType}"`,
  );
  return defaultStyles;
};
