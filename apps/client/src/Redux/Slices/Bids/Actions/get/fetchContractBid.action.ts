import { bidsActions } from '@Redux/Slices/Bids/bids.reducer';
import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';

import { contractActions } from '../../../Contracts/contracts.reducer';

export const FETCH_CONTRACT_BIDS = 'GET /v1/contracts/:contractId/bids';

export const fetchContractBids = createAsyncThunk(
  FETCH_CONTRACT_BIDS,
  async (contractId: string, { dispatch }) => {
    const response = await NetworkService.GET(`/v1/contracts/${contractId}/bids`);
    dispatch(bidsActions.upsertBids(response.data));
    dispatch(contractActions.upsertManyBids(response.data));
    return response.data;
  },
);
