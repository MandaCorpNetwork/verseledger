import { createSlice } from '@reduxjs/toolkit';
import { Logger } from '@Utils/Logger';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import { fetchContracts } from './actions/fetch/fetchContracts';
import { fetchContractsBySubtypes } from './actions/fetch/fetchSearchContracts';

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
    builder
      .addCase(fetchContracts.fulfilled, (_state, action) => {
        Logger.info('Fetch contracts fulfilled', action.payload);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        for (const contract of action.payload as any[]) {
          _state[contract.id as number] = contract;
        }
      })
      .addCase(fetchContractsBySubtypes.fulfilled, (_state, action) => {
        Logger.info(`Fetch Subtype fullfilled`, action.payload);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        for (const contract of action.payload as any[]) {
          _state[contract.id as number] = contract;
        }
      });
  },
});

export default contractsReducer;
export const actions = contractsReducer.actions;
