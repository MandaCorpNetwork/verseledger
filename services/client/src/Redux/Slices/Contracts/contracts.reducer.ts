import { createSlice } from '@reduxjs/toolkit';
import { Logger } from '@Utils/Logger';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';
import { IPaginatedDataSlice } from 'vl-shared/src/schemas/IPaginatedData';

import { fetchContracts } from './actions/fetch/fetchContracts';

const contractsReducer = createSlice({
  name: 'contracts',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: {
    isLoading: false,
    contracts: {} as Record<string, IContract>,
    pagination: {} as IPaginatedDataSlice,
  },
  reducers: {
    noop() {
      return {
        isLoading: false,
        contracts: {},
        pagination: { total: 0, limit: 0, page: 0, pages: 0 },
      };
    },
    insert(state, contract) {
      state.contracts[contract.payload.id] = contract.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchContracts.pending, (_state) => {
        _state.isLoading = true;
        _state.contracts = {};
      })
      .addCase(fetchContracts.fulfilled, (_state, action) => {
        Logger.info('Fetching contracts fulfilled', action.payload);
        _state.isLoading = false;
        const pagination = action.payload?.pages;
        const contracts = action.payload?.data;
        if (contracts) {
          contracts.forEach((contract) => {
            _state.contracts[contract.id] = contract;
          });
        } else {
          Logger.warn('Payload data is undefined or empty');
        }
        if (pagination) {
          _state.pagination = pagination;
        } else {
          Logger.warn('Payload pages is undefined or empty');
        }
      })
      .addCase(fetchContracts.rejected, (_state) => {
        _state.isLoading = false;
      });
  },
});

export default contractsReducer;
export const actions = contractsReducer.actions;
