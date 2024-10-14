import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';

import NetworkService from '@/Services/NetworkService';

export const updateTokens = createAsyncThunk('POST_update_session', async () => {
  const headers = AuthUtil.getRefreshHeader();
  const response = await NetworkService.POST('/v1/auth/refresh', {}, headers);
  return response.data;
});
