import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Logger } from '@Utils/Logger';

import { fetchCheckVerificationCode } from '../Auth/Actions/checkVerificationCode.action';
import { fetchContracts } from '../Contracts/actions/get/fetchContracts.action';
import { fetchSearchUserId } from './Actions/fetchUserById.action';
import { usersAdapter } from './users.adapters';
const usersReducer = createSlice({
  name: 'users',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  extraReducers(builder) {
    builder.addCase(fetchContracts.fulfilled, (_state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const contract of action.payload?.data as any[]) {
        Logger.info('CONTRACT', contract);
        const owner = contract.Owner;
        if (owner == null) continue;
        _state[owner.id as string] = owner;
      }
    });
    builder.addCase(fetchSearchUserId.fulfilled, (_state, action) => {
      const user = action.payload;
      const existingUser = _state[user.id] ?? {};
      _state[user.id] = { ...existingUser, ...user };
    });
  },
});

export default usersReducer;
export const usersActions = usersReducer.actions;
