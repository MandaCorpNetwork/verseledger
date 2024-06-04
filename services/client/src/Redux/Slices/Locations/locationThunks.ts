import { createAsyncThunk } from '@reduxjs/toolkit';

import NetworkService from '@/Services/NetworkService';

export const fetchLocations = createAsyncThunk('/v1/locations/search', async () => {
  const response = await NetworkService.GET('/v1/locations');
  console.log(response.data);
  return response.data;
});
