import { createSlice } from '@reduxjs/toolkit';

import { fetchContracts } from './contractThunks';
const contractsReducer = createSlice({
  name: 'contracts',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: {} as Record<Contract['id'], Contract>,
  reducers: {
    noop() {
      return {};
    },
    insert(state, contract) {
      return (state[contract.payload.id as number] = contract.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchContracts.fulfilled, (_state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const contract of action.payload as any[]) {
        _state[contract.id as number] = contract;
      }
    });
  },
});

export default contractsReducer;
export const actions = contractsReducer.actions;
