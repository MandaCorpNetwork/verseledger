import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';

export const FETCH_DELETE_VERIFICATION_CODE = 'DELETE /users/validate';

export const fetchDeleteVerificationCode = createAsyncThunk(
  FETCH_DELETE_VERIFICATION_CODE,
  async () => {
    const response = await NetworkService.DELETE(
      '/users/validate',
      AuthUtil.getAccessHeader(),
    );
    return response.data;
  },
);
