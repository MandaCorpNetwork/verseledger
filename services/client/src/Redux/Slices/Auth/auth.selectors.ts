import { RootState } from '@Redux/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectAuthObject = (state: RootState) => {
  return state.auth;
};

export const selectIsLoggedIn = createSelector([selectAuthObject], (authObject) => {
  return authObject.isLoggedIn;
});

export const selectCurrentUser = createSelector([selectAuthObject], (authObject) => {
  return authObject.isLoggedIn ? authObject.currentUser : null;
});

export const selectUserLocation = createSelector([selectAuthObject], (authObject) => {
  return authObject.userLocation;
});

export const selectUserSettings = createSelector([selectAuthObject], (authObject) => {
  return authObject.settings;
});

export const selectUserSoundPack = createSelector(
  [selectUserSettings],
  (settings) => settings.soundPack ?? 'systemDefault',
);
