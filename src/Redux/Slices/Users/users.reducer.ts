import { createSlice } from '@reduxjs/toolkit';

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
  },
});

export default usersReducer;
export const actions = usersReducer.actions;
