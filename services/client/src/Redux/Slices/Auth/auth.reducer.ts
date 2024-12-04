import { createSlice } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';
import { IDTO } from 'vl-shared/src/schemas/DTOSchema';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';
import { IUserSettings } from 'vl-shared/src/schemas/UserSettings';

import { fetchCheckVerificationCode } from './Actions/checkVerificationCode.action';
import { fetchCurrentUser } from './Actions/fetchCurrentUser.action';
import { fetchUserSettings } from './Actions/fetchUserSettings.action';
import { setUserLocation } from './Actions/setUserLocation.action';
import { updateTokens } from './Actions/updateTokens.action';
import { updateUserSettings } from './Actions/updateUserSettings.action';

const authReducer = createSlice({
  name: 'auth',

  initialState: {
    currentUser: {} as AuthUser & {
      Settings?: IDTO<IUserSettings>;
    },
    isLoggedIn: false,
    lastUpdated: 0,
    userLocation: {} as ILocation,
    settings: {} as IDTO<IUserSettings>,
  },
  reducers: {
    logout() {
      return {
        currentUser: {} as AuthUser,
        isLoggedIn: false,
        lastUpdated: Date.now(),
        userLocation: {} as ILocation,
        settings: {} as IDTO<IUserSettings>,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCurrentUser.fulfilled, (_state, action) => {
      _state.currentUser = action.payload as AuthUser;
      _state.isLoggedIn = true;
      _state.lastUpdated = Date.now();
    });
    builder.addCase(fetchCheckVerificationCode.fulfilled, (_state, action) => {
      _state.currentUser = action.payload as AuthUser;
      _state.isLoggedIn = true;
      _state.lastUpdated = Date.now();
    });
    builder.addCase(updateTokens.fulfilled, (state, action) => {
      state.lastUpdated = Date.now();
      const tokens = action.payload as {
        accessToken: { token: string };
        refreshToken: { token: string };
      };
      AuthUtil.setAccessToken(tokens.accessToken.token);
      AuthUtil.setRefreshToken(tokens.refreshToken.token);
    });
    builder.addCase(updateTokens.rejected, (state) => {
      state.lastUpdated = Date.now();

      AuthUtil.removeAccessToken();
      AuthUtil.removeRefreshToken();
    });
    builder.addCase(setUserLocation.fulfilled, (state, action) => {
      state.userLocation = action.payload;
    });
    builder.addCase(fetchUserSettings.fulfilled, (state, action) => {
      state.settings = action.payload;
    });
    builder.addCase(updateUserSettings.fulfilled, (state, action) => {
      const updatedSettings = action.payload;
      state.settings = {
        ...state.settings,
        ...updatedSettings,
      };
    });
  },
});

export default authReducer;
export const actions = authReducer.actions;
