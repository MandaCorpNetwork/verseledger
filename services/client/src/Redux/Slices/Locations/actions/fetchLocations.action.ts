import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';

export const fetchLocations = createAsyncThunk('/v1/locations/all', async () => {
  const response = await NetworkService.GET('/v1/locations', AuthUtil.getAccessHeader());
  return response.data;
});
