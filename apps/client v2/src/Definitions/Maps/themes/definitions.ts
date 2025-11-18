import { generateVerseOS } from '@/OS/VerseOS/theme/VerseOS.generator';
import { verseOSPalette } from '@/OS/VerseOS/theme/VerseOS.palette';

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
  vlTerminal: { palette: verseOSPalette, generator: generateVerseOS },
  hexOS: { palette: verseOSPalette, generator: generateVerseOS },
} as const;
