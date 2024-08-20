import { createAsyncThunk } from '@reduxjs/toolkit';
import { URLUtil } from '@Utils/URLUtil';
import axios from 'axios';

export const loginWithDiscord = createAsyncThunk('POST_discord', async (code: string) => {
  const response = await axios.post(`${URLUtil.backendHost}/v1/auth/discord`, {
    code,
  });
  return response;
});
