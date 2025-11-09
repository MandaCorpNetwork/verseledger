import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';

export const FETCH_CHECK_VERIFICATION_CODE = 'POST /users/validate';

export const fetchCheckVerificationCode = createAsyncThunk(
  FETCH_CHECK_VERIFICATION_CODE,
  async () => {
    const response = await NetworkService.POST(
      '/users/validate/check',
      null,
      AuthUtil.getAccessHeader(),
    );
    return response.data;
  },
);
