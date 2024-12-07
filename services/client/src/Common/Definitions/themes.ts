import { Theme } from '@mui/material';
import { pirateOS } from '@Themes/PirateOS';
import { refinerySystem } from '@Themes/RefineryOS';
import { verseOS } from '@Themes/VerseOS';

export type ThemeName = 'verseOS' | 'pirateOS' | 'refinerySystem';

export const baseThemesMap: Record<ThemeName, Theme> = {
  verseOS: verseOS,
  pirateOS: pirateOS,
  refinerySystem: refinerySystem,
};
