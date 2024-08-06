import { createSlice } from '@reduxjs/toolkit';
import { Logger } from '@Utils/Logger';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';
import { IPaginatedDataSlice } from 'vl-shared/src/schemas/IPaginatedData';

import { updateBid } from '../Bids/Actions/updateBid';
import { fetchContracts } from './actions/fetch/fetchContracts';
import { updateContract } from './actions/post/updateContract';

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
        const pagination = action.payload?.pagination;
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
      })
      .addCase(updateContract.fulfilled, (_state, action) => {
        const updatedContract = action.payload;
        if (updatedContract) {
          _state.contracts[updatedContract.id] = updatedContract;
        } else {
          Logger.warn('Payload Data is undefined or empty');
        }
      })
      .addCase(updateBid.fulfilled, (_state, action) => {
        const updatedBid = action.payload;
        if (updatedBid) {
          const contract = _state.contracts[updatedBid.contract_id];
          if (contract.Bids) {
            const bidIndex = contract.Bids.findIndex((bid) => bid.id === updatedBid.id);
            contract.Bids[bidIndex] = updatedBid;
          } else {
            Logger.warn('Payload Data is undefined or empty');
          }
        } else {
          Logger.warn('Payload Data is undefined or empty');
        }
      });
  },
});

export default contractsReducer;
export const actions = contractsReducer.actions;
