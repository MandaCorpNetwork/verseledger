import PirateOSGlow from '@Assets/Images/Logos/PirateOSGlowLogo.png?url';
import PirateOSLogo from '@Assets/Images/Logos/PirateOSLogo.png?url';
import PirateOSPotato from '@Assets/Images/Logos/PirateOSPotatoLogo.png?url';
import MaskLogo from '@Assets/Images/Logos/VerseLedgerMaskLogo.png?url';
import VerseOSGlow from '@Assets/Images/Logos/VerseOSGlowLogo.png?url';
import VerseOSLogo from '@Assets/Images/Logos/VerseOSLogo.png?url';
import VerseOSPotato from '@Assets/Images/Logos/VerseOSPotatoLogo.png?url';
import Checkmate from '@Assets/Videos/Checkmate.webm?url';
import RedMicrotech from '@Assets/Videos/RedMicrotech.webm?url';
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

export const logoThemeMap: Record<string, string> = {
  maskLogo: MaskLogo,
  verseOSGlow: VerseOSGlow,
  verseOSPotato: VerseOSPotato,
  verseOS: VerseOSLogo,
  pirateOSGlow: PirateOSGlow,
  pirateOSPotato: PirateOSPotato,
  pirateOS: PirateOSLogo,
};

export const videoThemeMap: Record<ThemeName, string> = {
  pirateOS: Checkmate,
  verseOS: RedMicrotech,
  refinerySystem: 'error',
};
