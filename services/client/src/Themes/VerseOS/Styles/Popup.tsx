import type { ThemeStyledComponents } from '@Common/Definitions/Themes/themeTypes';
import { alpha, type SxProps, type Theme } from '@mui/material/styles';

export const verseOSPopup: ThemeStyledComponents = {
  'Popup.Dialog': (theme: Theme): SxProps<Theme> => ({
    '& .MuiDialog-paper': {
      bgcolor: alpha(theme.palette.primary.dark, 0.6),
      display: 'flex',
      padding: '1em',
      flexDirection: 'column',
      borderTop: '2px solid',
      borderBottom: '2px solid',
      borderColor: theme.palette.primary.light,
      overflow: 'hidden',
    },
  }),
};
