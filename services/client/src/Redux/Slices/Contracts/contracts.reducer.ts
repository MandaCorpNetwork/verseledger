import { createSlice } from '@reduxjs/toolkit';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import { fetchContracts } from './actions/fetch/fetchContracts';

const contractsReducer = createSlice({
  name: 'contracts',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: {} as Record<IContract['id'], IContract>,
  reducers: {
    noop() {
      return {};
    },
    insert(state, contract) {
      state[contract.payload.id as number] = contract.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchContracts.fulfilled, (_state, action) => {
      console.log('Fetch contracts fulfilled', action.payload);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const contract of action.payload as any[]) {
        _state[contract.id as number] = contract;
      }
    });
  },
});

export default contractsReducer;
export const actions = contractsReducer.actions;
