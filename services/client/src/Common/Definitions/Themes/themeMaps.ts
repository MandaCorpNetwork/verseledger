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
import { refinerySystem } from '@Themes/RefinerySystem';
import { verseOS } from '@Themes/VerseOS';

const themeInfoDefault = {
  warning: false,
  disabled: false,
};

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

export const themeInfoMap: Record<ThemeName, ThemeInfo> = {
  verseOS: {
    theme: verseOS,
    themeLabel: 'VerseOS',
    themeType: 'verseOS',
    ...themeInfoDefault,
  },
  pirateOS: {
    theme: pirateOS,
    themeLabel: 'PirateOS',
    themeType: 'pirateOS',
    ...themeInfoDefault,
    warning: true,
    warningMsg: 'Work In Progress',
  },
  refinerySystem: {
    theme: refinerySystem,
    themeLabel: 'Refinery System C47.02',
    themeType: 'refinerySystem',
    warning: true,
    warningMsg: 'Awaiting Baseline',
    disabled: true,
  },
};
