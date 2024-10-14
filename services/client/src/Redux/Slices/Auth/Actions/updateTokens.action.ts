import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';

export const updateTokens = createAsyncThunk('POST_update_session', async () => {
  const headers = AuthUtil.getRefreshHeader();
  const response = await NetworkService.POST('/v1/auth/refresh', {}, headers);
  return response.data;
});
