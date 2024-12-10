declare type ThemeType = 'verseOS' | 'pirateOS' | 'refinerySystem';

declare type ThemeFidelity = 'high' | 'medium' | 'low' | 'potato';

declare type ThemeAnimations = 'high' | 'medium' | 'low' | 'none';

declare type ThemeInfo = {
  themeLabel: string;
  themeType: ThemeType;
  warning: boolean;
  warningMsg?: string;
  disabled: boolean;
};

declare type ThemeStyledComponents = Record<
  string,
  SxProps<Theme> | ((theme: Theme) => SxProps<Theme>)
>;

declare type ThemeLayouts = Record<
  string,
  SxProps<Theme> | ((theme: Theme) => SxProps<Theme>)
>;

declare type ThemeGenerator = (
  palette: Theme,
  fidelity: ThemeFidelity,
  animations: ThemeAnimations,
  transtions: ThemeOptions['transitions'],
) => Theme;

declare type BaseTheme = {
  themeName: string;
  palette: Theme;
  generator: ThemeGenerator;
  styledComponents: ThemeStyledComponents;
  layouts: ThemeLayouts;
};
