import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';

export const FETCH_VERIFICATION_CODE = 'GET /v1/users/validate';

export const fetchVerificationCode = createAsyncThunk(
  FETCH_VERIFICATION_CODE,
  async () => {
    const response = await NetworkService.GET(
      '/v1/users/validate',
      AuthUtil.getAccessHeader(),
    );
    return response.data;
  },
);
