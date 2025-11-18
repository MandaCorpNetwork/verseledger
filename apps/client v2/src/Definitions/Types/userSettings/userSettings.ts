import type { ThemeOS } from '../os/themeOS';
import type { Animations, Fidelity } from '../themes/themeTypes';

export type UserSettings = {
  theme: ThemeOS;
  animations: Animations;
  fidelity: Fidelity;
};
