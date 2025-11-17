declare module '@mui/material/styles' {
  interface Palette {
    tertiary: PalletteColor;
    glow?: string;
  }
  interface PalletOptions {
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
