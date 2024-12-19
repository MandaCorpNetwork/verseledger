import type { ThemeStyledComponents } from '@Common/Definitions/Themes/themeTypes';

import { verseOSContractManager } from './Layouts/ContractManager';
import { verseOSCoreBoxes } from './Styles/CoreBoxes';
import { verseOSMenus } from './Styles/Menus';

export const verseOSStyles: ThemeStyledComponents = {
  ...verseOSCoreBoxes,
  ...verseOSMenus,
  ...verseOSContractManager,
};
