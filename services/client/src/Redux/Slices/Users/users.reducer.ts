import { createSlice } from '@reduxjs/toolkit';

import { usersAdapter } from './users.adapters';
const usersReducer = createSlice({
  name: 'users',

  initialState: usersAdapter.getInitialState(),
  reducers: {
    noop() {
      return usersAdapter.getInitialState();
    },
    upsertUsers(state, action) {
      usersAdapter.upsertMany(state, action.payload);
    },
    upsertUser(state, action) {
      usersAdapter.upsertOne(state, action.payload);
    },
  },
});

export default usersReducer;
export const usersActions = usersReducer.actions;
