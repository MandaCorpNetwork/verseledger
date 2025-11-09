import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';

export const FETCH_CREATE_VERIFICATION_CODE = 'POST /users/validate';

export const fetchCreateVerificationCode = createAsyncThunk(
  FETCH_CREATE_VERIFICATION_CODE,
  async (handle: string) => {
    const response = await NetworkService.POST(
      '/users/validate',
      { handle },
      AuthUtil.getAccessHeader(),
    );
    return response.data;
  },
);
