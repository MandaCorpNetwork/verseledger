import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import { IDTOComplete } from 'vl-shared/src/schemas/DTOSchema';
import { IUser } from 'vl-shared/src/schemas/UserSchema';

import { usersActions } from '../users.reducer';

export const FETCH_SEARCH_USER_ID = 'GET /v1/users/id';

export const fetchSearchUserId = createAsyncThunk(
  FETCH_SEARCH_USER_ID,
  async (params: { userId: string; scope?: string[] }, { dispatch }) => {
    const response = await NetworkService.GET<IDTOComplete<IUser>>(
      `/v1/users/${params.userId}?scope=${(params.scope ?? []).join(',')}`,
      AuthUtil.getAccessHeader(),
    );
    dispatch(usersActions.upsertUser(response.data));
    return response.data;
  },
);
