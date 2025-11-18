import '@mui/material/styles';
declare module '@mui/material/styles' {
  interface Palette {
    tertiary: PaletteColor;
    glow?: string;
  }
  interface PaletteOptions {
    tertiary?: PaletteColorOptions;
    glow?: string;
  }
  interface Theme {
    themeType: ThemeType;
    fidelity: ThemeFidelity;
    animations: ThemeAnimations;
  }
  interface ThemeOptions {
    themeType?: ThemeType;
    fidelity?: ThemeFidelity;
    animations?: ThemeAnimations;
  }
}
