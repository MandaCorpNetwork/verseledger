import { generateVerseOS } from '@/Themes/verseOS/VerseOS.generator';
import { verseOSPalette } from '@/Themes/verseOS/VerseOS.palette';

export const themeDefinitions = {
  verseOS: {
    palette: verseOSPalette,
    generator: generateVerseOS,
  },
  pirateOS: {
    palette: verseOSPalette,
    generator: generateVerseOS,
  },
  refineryOS: { palette: verseOSPalette, generator: generateVerseOS },
  xian: { palette: verseOSPalette, generator: generateVerseOS },
  banu: { palette: verseOSPalette, generator: generateVerseOS },
} as const;
