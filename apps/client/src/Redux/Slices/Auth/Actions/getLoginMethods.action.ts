import { createAsyncThunk } from '@reduxjs/toolkit';
import { URLUtil } from '@Utils/URLUtil';
import axios from 'axios';

export const getLoginMethods = createAsyncThunk('GET_LOGIN_METHODS', async () => {
  const response = await axios.get<{ type: string; redirect: string }[]>(
    `${URLUtil.backendHost}/auth/login`,
  );
  return response;
});
