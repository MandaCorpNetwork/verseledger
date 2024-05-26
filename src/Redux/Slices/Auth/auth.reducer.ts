import { createSlice } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';

import { fetchCurrentUser } from './Actions/fetchCurrentUser';
import { updateTokens } from './Actions/updateTokens';
const authReducer = createSlice({
  name: 'auth',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: {
    currentUser: {} as AuthUser,
    isLoggedIn: false,
    lastUpdated: 0,
  },
  reducers: {
    logout() {
      return { currentUser: {} as AuthUser, isLoggedIn: false, lastUpdated: Date.now() };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCurrentUser.fulfilled, (_state, action) => {
      _state.currentUser = action.payload as AuthUser;
      _state.isLoggedIn = true;
      _state.lastUpdated = Date.now();
    });
    builder.addCase(updateTokens.fulfilled, (state, action) => {
      state.lastUpdated = Date.now();
      const tokens = action.payload as {
        accessToken: string;
        refreshToken: string;
      };
      AuthUtil.setAccessToken(tokens.accessToken);
      AuthUtil.setRefreshToken(tokens.refreshToken);
    });
    builder.addCase(updateTokens.rejected, (state) => {
      state.lastUpdated = Date.now();

      AuthUtil.removeAccessToken();
      AuthUtil.removeRefreshToken();
    });
  },
});

export default authReducer;
export const actions = authReducer.actions;
