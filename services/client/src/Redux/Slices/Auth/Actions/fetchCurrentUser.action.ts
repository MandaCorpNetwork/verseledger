import { usersActions } from '@Redux/Slices/Users/users.reducer';
import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

export const FETCH_CURRENT_USER = 'GET /v1/users/@me';

export const fetchCurrentUser = createAsyncThunk(
  FETCH_CURRENT_USER,
  async (_, { dispatch }) => {
    const response = await NetworkService.GET(
      '/v1/users/@me',
      AuthUtil.getAccessHeader(),
    );
    const user = response.data as IUser;
    dispatch(usersActions.upsertUser(user));
    return response.data;
  },
);
