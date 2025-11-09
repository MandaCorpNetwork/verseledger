import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import type { ApiPermission } from 'vl-shared/src/enum/ApiPermission';

export const FETCH_CREATE_USER_TOKEN = 'POST /auth/tokens';

export const createUserTokens = createAsyncThunk(
  FETCH_CREATE_USER_TOKEN,
  async (v: { name: string; expires: string; roles: ApiPermission[] }) => {
    const { name, expires, roles = [] } = v;
    const response = await NetworkService.POST<
      { id: string; name: string; token_id: string; expiresAt: string },
      { name: string; expires: string; roles: ApiPermission[] }
    >('/auth/tokens', { name, expires, roles }, AuthUtil.getAccessHeader());
    return response.data;
  },
);
