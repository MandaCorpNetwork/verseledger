import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';

import NetworkService from '@/Services/NetworkService';

export const fetchLocations = createAsyncThunk('/v1/locations/all', async () => {
  const response = await NetworkService.GET('/v1/locations', AuthUtil.getAccessHeader());
  return response.data;
});
