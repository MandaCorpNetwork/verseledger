import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';

export const FETCH_CONTRACT_BIDS = 'GET /v1/contracts/:contractId/bids';

export const fetchContractBids = createAsyncThunk(
  FETCH_CONTRACT_BIDS,
  async (contractId: string) => {
    const response = await NetworkService.GET(`/v1/contracts/${contractId}/bids`);
    return response.data;
  },
);
