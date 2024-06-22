import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';

import NetworkService from '@/Services/NetworkService';

export const POST_CONTRACT_INVITE = 'POST /v1/contracts/:contractId/invite';

export const postContractInvite = createAsyncThunk(
  POST_CONTRACT_INVITE,
  async ({ contractId, userId }: { contractId: string; userId: string }) => {
    const response = await NetworkService.POST(
      `/v1/contracts/${contractId}/invite`,
      { userId: userId },
      AuthUtil.getAccessHeader(),
    );
    return response.data;
  },
);
