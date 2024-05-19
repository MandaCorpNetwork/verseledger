import { createSlice } from '@reduxjs/toolkit';

import { fetchCurrentUser } from './Actions/fetchCurrentUser';
const authReducer = createSlice({
  name: 'auth',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: { currentUser: {} as AuthUser, isLoggedIn: false },
  reducers: {
    logout() {
      return { currentUser: {} as AuthUser, isLoggedIn: false };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCurrentUser.fulfilled, (_state, action) => {
      _state.currentUser = action.payload as AuthUser;
      _state.isLoggedIn = true;
    });
  },
});

export default authReducer;
export const actions = authReducer.actions;
