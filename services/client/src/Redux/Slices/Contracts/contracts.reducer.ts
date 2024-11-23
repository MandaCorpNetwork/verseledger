import { createSlice } from '@reduxjs/toolkit';
import { Logger } from '@Utils/Logger';
import { IContractBid } from 'vl-shared/src/schemas/contracts/ContractBidSchema';
import { IPaginatedDataSlice } from 'vl-shared/src/schemas/IPaginatedData';

import { fetchContracts } from './actions/get/fetchContracts.action';
import { contractsAdapter } from './contracts.adapters';

const initialState = {
  isLoading: false,
  contracts: contractsAdapter.getInitialState(),
  pagination: {} as IPaginatedDataSlice,
};

const contractsReducer = createSlice({
  name: 'contracts',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState,
  reducers: {
    noop() {
      return initialState;
    },
    addContract(state, action) {
      contractsAdapter.addOne(state.contracts, action.payload);
    },
    contractsLoading(state) {
      state.isLoading = true;
      state.contracts = contractsAdapter.getInitialState();
    },
    addContracts(state, action) {
      state.isLoading = false;
      contractsAdapter.addMany(state.contracts, action.payload);
    },
    updateContract(state, action) {
      contractsAdapter.updateOne(state.contracts, action.payload);
    },
    upsertBid(state, action) {
      const updatedBid = action.payload;
      const contract = state.contracts.entities[updatedBid.contract_id];
      if (!contract) return Logger.error('Unable to Find Contract for Bid');
      contractsAdapter.upsertOne(state.contracts, {
        ...contract,
        Bids: (contract.Bids || []).map((bid) =>
          bid.id === updatedBid.id ? { ...bid, ...updatedBid } : bid,
        ),
      });
    },
    upsertManyBids(state, action) {
      const updatedBids = action.payload;
      const contract = state.contracts.entities[updatedBids[0].contract_id];
      if (!contract) return Logger.error('Unable to Find Contract for Bid');
      contractsAdapter.upsertOne(state.contracts, {
        ...contract,
        Bids: (contract.Bids || []).map((bid) => {
          const updatedBid = updatedBids.find((b: IContractBid) => b.id === bid.id);
          return updatedBid ? { ...bid, ...updatedBid } : bid;
        }),
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchContracts.fulfilled, (_state, action) => {
        const pagination = action.payload?.pagination;
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
export const contractActions = contractsReducer.actions;
