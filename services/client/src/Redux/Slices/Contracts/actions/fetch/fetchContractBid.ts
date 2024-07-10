import { createAsyncThunk } from '@reduxjs/toolkit';
import { Logger } from '@Utils/Logger';
import { IUserBidSearch } from 'vl-shared/src/schemas/SearchSchema';

import NetworkService from '@/Services/NetworkService';

export const FETCH_CONTRACT_BIDS = 'GET /v1/contracts/:contractId/bids';

export const fetchContractBids = createAsyncThunk(
  FETCH_CONTRACT_BIDS,
  async (contractId: string) => {
    const response = await NetworkService.GET(`/v1/contracts/${contractId}/bids`);
    return response.data;
  },
);

export const fetchContractsByBids = createAsyncThunk(
  'GET /v1/contracts/:userId/bids',
  async (params: IUserBidSearch) => {
    try {
      const response = null;
      return response;
    } catch (error) {
      Logger.error(error);
    }
  },
);
