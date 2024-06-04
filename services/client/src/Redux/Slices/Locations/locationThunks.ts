import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';

import NetworkService from '@/Services/NetworkService';

export const fetchLocations = createAsyncThunk('/v1/locations/search', async () => {
  const response = await NetworkService.GET('/v1/locations', AuthUtil.getAccessHeader());
  console.log(response.data);
  return response.data;
});
