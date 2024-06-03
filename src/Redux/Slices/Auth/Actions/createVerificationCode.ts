import { createAsyncThunk } from '@reduxjs/toolkit';

import NetworkService from '@/Services/NetworkService';
import { AuthUtil } from '@/Utils/AuthUtil';

export const FETCH_CREATE_VERIFICATION_CODE = 'POST /v1/users/validate';

export const fetchCreateVerificationCode = createAsyncThunk(
  FETCH_CREATE_VERIFICATION_CODE,
  async (handle: string) => {
    const response = await NetworkService.POST(
      '/v1/users/validate',
      { handle },
      AuthUtil.getAccessHeader(),
    );
    return response.data;
  },
);
