import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';

import NetworkService from '@/Services/NetworkService';

export const FETCH_SEARCH_USER_ID = 'GET /v1/users/id';

export const fetchSearchUserId = createAsyncThunk(
  FETCH_SEARCH_USER_ID,
  async (userId: string) => {
    const response = await NetworkService.GET(
      `/v1/users/${userId}`,
      AuthUtil.getAccessHeader(),
    );
    return response.data as User;
  },
);
