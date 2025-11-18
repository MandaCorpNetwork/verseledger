import { themeDefinitions } from '@Maps/themes/definitions';
import { transitionPresets } from '@Maps/themes/transitions';
import type { ThemeOS } from '@Types/os/themeOS';
import { createTheme, type ThemeOptions } from '@mui/material';
import type { Animations, Fidelity } from '@Types/themes/themeTypes';

export const getTransitionPreset = (
  animations: Animations,
): ThemeOptions['transitions'] => {
  return transitionPresets[animations] ?? transitionPresets.medium;
};

export const createAppTheme = (options: {
  theme: ThemeOS;
  fidelity: Fidelity;
  animations: Animations;
}) => {
  const { theme: themeName, fidelity, animations } = options;

  const themeDef = themeDefinitions[themeName] ?? themeDefinitions.verseOS;

  const base = createTheme(themeDef.palette);

  const transitions = getTransitionPreset(animations);

  return themeDef.generator(base, fidelity, animations, transitions);
};
