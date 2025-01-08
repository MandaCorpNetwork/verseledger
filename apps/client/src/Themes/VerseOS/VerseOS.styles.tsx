import type { ThemeStyledComponents } from '@Common/Definitions/Themes/themeTypes';

import { verseOSContractManager } from './Layouts/Contracts/ContractManager';
import { verseOSContractsComponents } from './Layouts/Contracts/Contracts';
import { verseOSButtons } from './Styles/Buttons';
import { verseOSCoreBoxes } from './Styles/CoreBoxes';
import { verseOSMenus } from './Styles/Menus';
import { verseOSPopup } from './Styles/Popup';

export const verseOSStyles: ThemeStyledComponents = {
  ...verseOSCoreBoxes,
  ...verseOSMenus,
  ...verseOSButtons,
  ...verseOSContractsComponents,
  ...verseOSContractManager,
  ...verseOSPopup,
};
