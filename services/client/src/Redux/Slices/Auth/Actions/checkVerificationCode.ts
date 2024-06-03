import { createAsyncThunk } from '@reduxjs/toolkit';

import NetworkService from '@/Services/NetworkService';
import { AuthUtil } from '@/Utils/AuthUtil';

export const FETCH_CHECK_VERIFICATION_CODE = 'POST /v1/users/validate';

export const fetchCheckVerificationCode = createAsyncThunk(
  FETCH_CHECK_VERIFICATION_CODE,
  async () => {
    const response = await NetworkService.POST(
      '/v1/users/validate/check',
      null,
      AuthUtil.getAccessHeader(),
    );
    return response.data;
  },
);
