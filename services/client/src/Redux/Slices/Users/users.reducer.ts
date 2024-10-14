import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Logger } from '@Utils/Logger';

import { fetchCheckVerificationCode } from '../Auth/Actions/checkVerificationCode.action';
import { fetchCurrentUser } from '../Auth/Actions/fetchCurrentUser.action';
import { fetchContracts } from '../Contracts/actions/get/fetchContracts.action';
import { fetchSearchUserId } from './Actions/fetchUserById.action';
const usersReducer = createSlice({
  name: 'users',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: {} as Record<User['id'], User>,
  reducers: {
    noop() {
      return {};
    },
    updateUsers(state, action: PayloadAction<User[]>) {
      action.payload.forEach((user) => {
        state[user.id] = user;
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCurrentUser.fulfilled, (_state, action) => {
      const currentUser = action.payload as AuthUser;
      _state[currentUser.id] = currentUser;
    });
    builder.addCase(fetchCheckVerificationCode.fulfilled, (_state, action) => {
      const currentUser = action.payload as AuthUser;
      _state[currentUser.id] = currentUser;
    });
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
export const actions = usersReducer.actions;
