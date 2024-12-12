import PirateOSGlow from '@Assets/Images/Logos/PirateOSGlowLogo.png?url';
import PirateOSLogo from '@Assets/Images/Logos/PirateOSLogo.png?url';
import PirateOSPotato from '@Assets/Images/Logos/PirateOSPotatoLogo.png?url';
import MaskLogo from '@Assets/Images/Logos/VerseLedgerMaskLogo.png?url';
import VerseOSGlow from '@Assets/Images/Logos/VerseOSGlowLogo.png?url';
import VerseOSLogo from '@Assets/Images/Logos/VerseOSLogo.png?url';
import VerseOSPotato from '@Assets/Images/Logos/VerseOSPotatoLogo.png?url';
import Checkmate from '@Assets/Videos/Checkmate.webm?url';
import RedMicrotech from '@Assets/Videos/RedMicrotech.webm?url';
import { generatePirateOSBase } from '@Themes/PirateOS/PirateOS.generator';
import { pirateOSPalette } from '@Themes/PirateOS/PirateOS.palette';
import { pirateOSStyles } from '@Themes/PirateOS/PirateOS.styles';
import { generateVerseOSBase } from '@Themes/VerseOS/VerseOS.generator';
import { verseOSPalette } from '@Themes/VerseOS/VerseOS.palette';
import { verseOSStyles } from '@Themes/VerseOS/VerseOS.styles';

const themeInfoDefault = {
  warning: false,
  disabled: false,
};

export const baseThemesMap: Record<ThemeType, BaseTheme> = {
  verseOS: {
    themeName: 'verseOS',
    palette: verseOSPalette,
    generator: generateVerseOSBase,
    styledComponents: verseOSStyles,
  },
  pirateOS: {
    themeName: 'pirateOS',
    palette: pirateOSPalette,
    generator: generatePirateOSBase,
    styledComponents: pirateOSStyles,
  },
  refinerySystem: {} as BaseTheme,
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

export const videoThemeMap: Record<ThemeType, string> = {
  pirateOS: Checkmate,
  verseOS: RedMicrotech,
  refinerySystem: 'error',
};

export const themeInfoMap: Record<ThemeType, ThemeInfo> = {
  verseOS: {
    themeLabel: 'VerseOS',
    themeType: 'verseOS',
    ...themeInfoDefault,
  },
  pirateOS: {
    themeLabel: 'PirateOS',
    themeType: 'pirateOS',
    ...themeInfoDefault,
    warning: true,
    warningMsg: 'Work In Progress',
  },
  refinerySystem: {
    themeLabel: 'Refinery System C47.02',
    themeType: 'refinerySystem',
    warning: true,
    warningMsg: 'Awaiting Baseline',
    disabled: true,
  },
};
