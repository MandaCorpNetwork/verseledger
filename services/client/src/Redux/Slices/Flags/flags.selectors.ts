import { RootState } from '@Redux/store';
import { createSelector } from '@reduxjs/toolkit';
import { murmurhash } from 'vl-shared/src/murmurhash';
import { IFeatureFlag } from 'vl-shared/src/schemas/FeatureFlagSchema';

import { selectCurrentUser } from '../Auth/auth.selectors';

const MAX_UINT_SIZE = 4294967295;

export const selectFlagsObject = (state: RootState) => {
  return state.flags;
};

export const selectFlag = createSelector(
  [selectFlagsObject, (_, flag: string) => flag],
  (flagsObject, flag): IFeatureFlag | null => {
    return flagsObject[flag] ?? null;
  },
);

export const selectHasFlag = createSelector(
  [selectCurrentUser, selectFlag],
  (user, flag) => {
    if (user == null) return false;
    if (flag == null) return false;
    if (flag.settingName != null && flag.settingValue != null) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((user.Settings as any)?.[flag.settingName] != flag.settingValue) return false;
    }
    if (flag.percentageOfUsers != null && flag.percentageOfUsers < 100) {
      if (murmurhash(`${user.id}-${flag.name}`) / MAX_UINT_SIZE >= flag.percentageOfUsers)
        return false;
    }
    return true;
  },
);
