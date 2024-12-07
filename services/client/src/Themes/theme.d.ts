import '@mui/material/Divider';
import '@mui/material/Button';
import '@mui/material/Typography';
import '@mui/material/Box';
import '@mui/material/ListItemButton';
import '@mui/material/styles';

declare module '@mui/material/Divider' {
  interface DividerPropsVariantOverrides {
    ToolTitle: true;
    ComponentTitle: true;
  }
}

declare module '@mui/material/ListItemButton' {
  interface ListItemButtonPropsVariantOverrides {
    formItemSelect: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    popupButton: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    tip: true;
    paragraph: true;
    error: true;
    dropDown: true;
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    themeType?: 'verseOS' | 'pirateOS';
  }
  interface ThemeOptions {
    themeType?: 'verseOS' | 'pirateOS';
  }
}
