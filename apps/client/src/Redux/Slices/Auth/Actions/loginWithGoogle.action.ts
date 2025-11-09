import { createAsyncThunk } from '@reduxjs/toolkit';
import { URLUtil } from '@Utils/URLUtil';
import axios from 'axios';

export const loginWithGoogle = createAsyncThunk('POST_google', async (code: string) => {
  const response = await axios.post(`${URLUtil.backendHost}/auth/google`, {
    code,
  });
  return response;
});
