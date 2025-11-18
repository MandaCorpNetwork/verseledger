import Checkmate from '@Assets/Videos/Checkmate.webm?url';
import RedMicrotech from '@Assets/Videos/RedMicrotech.webm?url';

export const logoThemeMap: Record<string, string> = {};

export const videoThemeMap = {
  verseOS: RedMicrotech,
  pirateOS: Checkmate,
  refineryOS: RedMicrotech,
  vlTerminal: RedMicrotech,
  hexOS: RedMicrotech
} as const;