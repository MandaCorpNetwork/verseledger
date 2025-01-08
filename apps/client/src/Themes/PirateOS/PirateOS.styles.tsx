import type { ThemeStyledComponents } from '@Common/Definitions/Themes/themeTypes';

import { pirateOSUserSettingsLayout } from './Layouts/UserSettings/UserSettings';
import { pirateOSCoreBoxes } from './Styles/CoreBoxes';
import { pirateOSMenus } from './Styles/Menus';

export const pirateOSStyles: ThemeStyledComponents = {
  ...pirateOSCoreBoxes,
  ...pirateOSUserSettingsLayout,
  ...pirateOSMenus,
};
