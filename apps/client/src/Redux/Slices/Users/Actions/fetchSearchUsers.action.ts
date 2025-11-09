import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

export const FETCH_SEARCH_USERS = 'GET /users/search';

export const fetchSearchUsers = createAsyncThunk<IUser[], string>(
  FETCH_SEARCH_USERS,
  async (searchTerm: string) => {
    const response = await NetworkService.GET(
      `/users/search?q=${searchTerm}`,
      AuthUtil.getAccessHeader(),
    );
    return response.data as IUser[];
  },
);
