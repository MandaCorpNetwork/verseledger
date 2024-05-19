import { createAsyncThunk } from '@reduxjs/toolkit';

import NetworkService from '@/Services/NetworkService';
import { AuthUtil } from '@/Utils/AuthUtil';

export const FETCH_CURRENT_USER = 'GET /v1/users/@me';

export const fetchCurrentUser = createAsyncThunk(FETCH_CURRENT_USER, async () => {
  const response = await NetworkService.GET('/v1/users/@me', AuthUtil.getAccessHeader());
  console.log(response.data);
  return response.data;
});
