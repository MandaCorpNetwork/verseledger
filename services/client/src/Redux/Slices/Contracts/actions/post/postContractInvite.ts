import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
import { IDTOComplete } from 'vl-shared/src/schemas/DTOSchema';

import NetworkService from '@/Services/NetworkService';

export const POST_CONTRACT_INVITE = 'POST /v1/contracts/:contractId/invite';

export const postContractInvite = createAsyncThunk(
  POST_CONTRACT_INVITE,
  async ({ contractId, userId }: { contractId: string; userId: string }) => {
    const response = await NetworkService.POST<
      IDTOComplete<IContractBid>,
      { userId: string }
    >(
      `/v1/contracts/${contractId}/invite`,
      { userId: userId },
      AuthUtil.getAccessHeader(),
    );
    return response.data;
  },
);
