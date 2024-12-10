declare type ThemeName = 'verseOS' | 'pirateOS' | 'refinerySystem';

declare type ThemeInfo = {
  theme: Theme;
  themeLabel: string;
  themeType: ThemeName;
  warning: boolean;
  warningMsg?: string;
  disabled: boolean;
};
