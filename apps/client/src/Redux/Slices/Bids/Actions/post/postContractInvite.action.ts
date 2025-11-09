import { bidsActions } from '@Redux/Slices/Bids/bids.reducer';
import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import type { IContractBid } from 'vl-shared/src/schemas/contracts/ContractBidSchema';
import type { IDTOComplete } from 'vl-shared/src/schemas/DTOSchema';

import { contractActions } from '../../../Contracts/contracts.reducer';

export const POST_CONTRACT_INVITE = 'POST /contracts/:contractId/bids/invite';

//TODO: When Creating Contract Invites, should pass as an Array to handle in one call and then return back in an array

export const postContractInvite = createAsyncThunk(
  POST_CONTRACT_INVITE,
  async (
    { contractId, userId }: { contractId: string; userId: string },
    { dispatch },
  ) => {
    const response = await NetworkService.POST<
      IDTOComplete<IContractBid>,
      { userId: string }
    >(
      `/contracts/${contractId}/bids/invite`,
      { userId: userId },
      AuthUtil.getAccessHeader(),
    );
    dispatch(bidsActions.addBid(response.data));
    dispatch(contractActions.upsertBid(response.data));
    return response.data;
  },
);
