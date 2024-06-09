import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';

import NetworkService from '@/Services/NetworkService';

export const POST_CONTRACT_BID = 'POST /v1/contracts/:contractId/bids';

export const postContractBid = createAsyncThunk(
  POST_CONTRACT_BID,
  async (contractId: string) => {
    const response = await NetworkService.POST(
      `/v1/contracts/${contractId}/bids`,
      {},
      AuthUtil.getAccessHeader(),
    );
    return response.data;
  },
);
