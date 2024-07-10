import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Logger } from '@Utils/Logger';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';

import { fetchContractBidsOfUser } from '../Users/Actions/fetchContractBidsByUser';

const bidsReducer = createSlice({
  name: 'bids',
  initialState: {} as Record<string, IContractBid>,
  reducers: {
    noop() {
      return {};
    },
    insert(state, action: PayloadAction<IContractBid[]>) {
      action.payload.forEach((bid) => {
        state[bid.id] = bid;
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchContractBidsOfUser.fulfilled, (_state, action) => {
      Logger.info('Fetching Bids Fulfilled', action.payload);
      const bids = action.payload?.data;
      if (bids) {
        bids.forEach((bid) => {
          _state[bid.id] = bid;
        });
      } else {
        Logger.warn('Payload data is undefined or empty');
      }
    });
  },
});

export default bidsReducer;
export const actions = bidsReducer.actions;
