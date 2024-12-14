import type { SxProps, Theme, ThemeOptions } from '@mui/material';

export type ThemeType = 'verseOS' | 'pirateOS' | 'refinerySystem';

export type ThemeFidelity = 'high' | 'medium' | 'low' | 'potato';

export type ThemeAnimations = 'high' | 'medium' | 'low' | 'none';

export type ThemeInfo = {
  themeLabel: string;
  themeType: ThemeType;
  warning: boolean;
  warningMsg?: string;
  disabled: boolean;
};

export type ThemeStyledComponents = Record<
  string,
  SxProps<Theme> | ((theme: Theme) => SxProps<Theme>)
>;

export type ThemeGenerator = (
  palette: Theme,
  fidelity: ThemeFidelity,
  animations: ThemeAnimations,
  transtions: ThemeOptions['transitions'],
) => Theme;

export type BaseTheme = {
  themeName: string;
  palette: Theme;
  generator: ThemeGenerator;
  styledComponents: ThemeStyledComponents;
};
