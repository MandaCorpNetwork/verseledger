import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';

export const FETCH_GET_USER_TOKENS = 'GET /auth/tokens';

export const fetchUserTokens = createAsyncThunk(FETCH_GET_USER_TOKENS, async () => {
  const response = await NetworkService.GET<
    { id: string; name: string; token_id: string; expiresAt: string }[]
  >('/auth/tokens', AuthUtil.getAccessHeader());
  return response.data;
});
