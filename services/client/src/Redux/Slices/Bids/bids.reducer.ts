import { createSlice } from '@reduxjs/toolkit';
import { Logger } from '@Utils/Logger';
import { IPaginatedDataSlice } from 'vl-shared/src/schemas/IPaginatedData';

import { fetchContractBidsOfUser } from '../Users/Actions/fetchContractBidsByUser.action';
import { bidsAdapter } from './bids.adapters';

const initialState = {
  bids: bidsAdapter.getInitialState(),
  pagination: {} as IPaginatedDataSlice,
};

const bidsReducer = createSlice({
  name: 'bids',
  initialState,
  reducers: {
    noop() {
      return initialState;
    },
    addBids(state, action) {
      bidsAdapter.addMany(state.bids, action.payload);
    },
    updateBid(state, action) {
      bidsAdapter.updateOne(state.bids, action.payload);
    },
    addBid(state, action) {
      bidsAdapter.addOne(state.bids, action.payload);
    },
    upsertBids(state, action) {
      bidsAdapter.upsertMany(state.bids, action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchContractBidsOfUser.fulfilled, (_state, action) => {
      const pagination = action.payload?.pagination;
      if (pagination) {
        _state.pagination = pagination;
      } else {
        Logger.warn('Payload pages is undefined or empty');
      }
    });
  },
});

export default bidsReducer;
export const bidsActions = bidsReducer.actions;
