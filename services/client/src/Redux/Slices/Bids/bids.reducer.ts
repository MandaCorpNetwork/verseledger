import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Logger } from '@Utils/Logger';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
import { IPaginatedDataSlice } from 'vl-shared/src/schemas/IPaginatedData';

import { fetchContractBidsOfUser } from '../Users/Actions/fetchContractBidsByUser';
import { updateBid } from './Actions/updateBid';

const bidsReducer = createSlice({
  name: 'bids',
  initialState: {
    bids: {} as Record<string, IContractBid>,
    pagination: {} as IPaginatedDataSlice,
  },
  reducers: {
    noop() {
      return {
        bids: {},
        pagination: { total: 0, limit: 0, page: 0, pages: 0 },
      };
    },
    insert(state, action: PayloadAction<IContractBid[]>) {
      action.payload.forEach((bid) => {
        state.bids[bid.id] = bid;
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchContractBidsOfUser.fulfilled, (_state, action) => {
        Logger.info('Fetching Bids Fulfilled', action.payload);
        const bids = action.payload?.data;
        const pagination = action.payload?.pagination;
        if (bids) {
          bids.forEach((bid) => {
            _state.bids[bid.id] = bid;
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
      .addCase(updateBid.fulfilled, (_state, action) => {
        const updatedBid = action.payload;
        if (updatedBid) {
          _state.bids[updatedBid.id] = { ..._state.bids[updatedBid.id], ...updatedBid };
        } else {
          Logger.warn('Payload data is undefined or empty');
        }
      });
  },
});

export default bidsReducer;
export const actions = bidsReducer.actions;
