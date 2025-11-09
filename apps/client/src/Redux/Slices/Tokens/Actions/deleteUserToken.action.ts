import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';

export const FETCH_DELETE_USER_TOKEN = 'DELETE /auth/tokens/:token_id';

export const deleteUserToken = createAsyncThunk(
  FETCH_DELETE_USER_TOKEN,
  async (token: string) => {
    await NetworkService.DELETE<boolean>(
      `/auth/tokens/${token}`,
      AuthUtil.getAccessHeader(),
    );
    return token;
  },
);
