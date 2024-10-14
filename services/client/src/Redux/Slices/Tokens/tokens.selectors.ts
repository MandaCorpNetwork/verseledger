import { RootState } from '@Redux/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectTokenObject = (state: RootState) => {
  return state.tokens;
};

export const selectTokensArray = createSelector([selectTokenObject], (tokensObject) => {
  return Object.values(tokensObject);
});
