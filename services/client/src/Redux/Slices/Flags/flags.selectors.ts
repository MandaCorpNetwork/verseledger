import type { RootState } from '@Redux/store';
import { createSelector } from '@reduxjs/toolkit';
import { murmurhash } from 'vl-shared/src/murmurhash';
import type { IFeatureFlag } from 'vl-shared/src/schemas/FeatureFlagSchema';

import { selectCurrentUser, selectUserSettings } from '../Auth/auth.selectors';

const MAX_UINT_SIZE = 4294967295;

export const inFlagPercent = (key: string, percent: number) => {
  const hash = murmurhash(key) / MAX_UINT_SIZE;
  console.log(key, hash);
  return hash <= percent;
};

const hasFlag = (
  user: ReturnType<typeof selectCurrentUser>,
  settings: ReturnType<typeof selectUserSettings>,
  flag: IFeatureFlag | null,
) => {
  if (user == null) return false;
  if (flag == null) return false;
  if (flag.settingName != null && flag.settingValue != null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((settings as any)?.[flag.settingName] != flag.settingValue) return false;
  }
  if (flag.percentageOfUsers != null && flag.percentageOfUsers < 1) {
    const hasPercentage = inFlagPercent(`${user.id}-${flag.id}`, flag.percentageOfUsers);
    if (!hasPercentage) return false;
  }
  return true;
};

export const selectFlagsObject = (state: RootState) => {
  return state.flags;
};

export const selectFlagsArray = createSelector([selectFlagsObject], (flags) => {
  return Object.values<IFeatureFlag>(flags);
});

export const selectMyFlagsArray = createSelector(
  [selectCurrentUser, selectUserSettings, selectFlagsArray],
  (user, settings, flags) => {
    return flags.filter((flag) => hasFlag(user, settings, flag));
  },
);

export const selectFlag = createSelector(
  [selectFlagsObject, (_, flag: string) => flag],
  (flagsObject, flag): IFeatureFlag | null => {
    return flagsObject[flag] ?? null;
  },
);

export const selectHasFlag = createSelector(
  [selectCurrentUser, selectUserSettings, selectFlag],
  hasFlag,
);
