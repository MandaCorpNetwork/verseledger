import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';

export const FETCH_SEARCH_USERS = 'GET /v1/users/search';

export const fetchSearchUsers = createAsyncThunk<User[], string>(
  FETCH_SEARCH_USERS,
  async (searchTerm: string) => {
    const response = await NetworkService.GET(
      `/v1/users/search?q=${searchTerm}`,
      AuthUtil.getAccessHeader(),
    );
    return response.data as User[];
  },
);
