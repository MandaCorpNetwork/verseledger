import { contractActions } from '@Redux/Slices/Contracts/contracts.reducer';
import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';

import { bidsActions } from '../../bids.reducer';

export const POST_CONTRACT_BID = 'POST /contracts/:contractId/bids';

export const postContractBid = createAsyncThunk(
  POST_CONTRACT_BID,
  async (contractId: string, { dispatch }) => {
    const response = await NetworkService.POST(
      `/contracts/${contractId}/bids`,
      {},
      AuthUtil.getAccessHeader(),
    );
    dispatch(bidsActions.addBid(response.data));
    dispatch(contractActions.upsertBid(response.data));
    return response.data;
  },
);
