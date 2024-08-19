import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/Redux/store';

export const selectTokenObject = (state: RootState) => {
  return state.tokens;
};

export const selectTokensArray = createSelector([selectTokenObject], (tokensObject) => {
  return Object.values(tokensObject);
});
