import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/Redux/store';

export const selectAuthObject = (state: RootState) => {
  return state.auth;
};

export const selectIsLoggedIn = createSelector([selectAuthObject], (authObject) => {
  return authObject.isLoggedIn;
});

export const selectCurrentUser = createSelector([selectAuthObject], (authObject) => {
  return authObject.isLoggedIn ? authObject.currentUser : null;
});
