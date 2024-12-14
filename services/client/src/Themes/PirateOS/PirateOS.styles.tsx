import type { ThemeStyledComponents } from '@Common/Definitions/Themes/themeTypes';

import { pirateOSUserSettingsLayout } from './Layouts/UserSettings/UserSettings';
import { pirateOSCoreBoxes } from './Styles/CoreBoxes';

export const pirateOSStyles: ThemeStyledComponents = {
  ...pirateOSCoreBoxes,
  ...pirateOSUserSettingsLayout,
};
