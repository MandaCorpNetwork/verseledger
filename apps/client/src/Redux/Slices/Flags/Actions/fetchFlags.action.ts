import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import type { IFeatureFlag } from 'vl-shared/src/schemas/FeatureFlagSchema';

export const FETCH_GET_USER_FLAGS = 'GET /features/flags';

export const fetchUserFlags = createAsyncThunk(FETCH_GET_USER_FLAGS, async () => {
  const response = await NetworkService.GET<IFeatureFlag[]>(
    '/features/flags',
    AuthUtil.getAccessHeader(),
  );
  return response.data;
});
