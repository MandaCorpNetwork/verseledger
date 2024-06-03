import { createSlice } from '@reduxjs/toolkit';

import { fetchCheckVerificationCode } from '../Auth/Actions/checkVerificationCode';
import { fetchCurrentUser } from '../Auth/Actions/fetchCurrentUser';
import { fetchContracts } from '../Contracts/contractThunks';
const usersReducer = createSlice({
  name: 'users',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: {} as Record<User['id'], User>,
  reducers: {
    noop() {
      return {};
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchContracts.fulfilled, (_state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const contract of action.payload as any[]) {
        console.log('CONTRACT', contract);
        const owner = contract.Owner;
        if (owner == null) continue;
        _state[owner.id as string] = owner;
      }
    });
    builder.addCase(fetchCurrentUser.fulfilled, (_state, action) => {
      const currentUser = action.payload as AuthUser;
      _state[currentUser.id] = currentUser;
    });
    builder.addCase(fetchCheckVerificationCode.fulfilled, (_state, action) => {
      const currentUser = action.payload as AuthUser;
      _state[currentUser.id] = currentUser;
    });
  },
});

export default usersReducer;
export const actions = usersReducer.actions;
