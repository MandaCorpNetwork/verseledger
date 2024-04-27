import { createAsyncThunk } from '@reduxjs/toolkit';

import NetworkService from '@/Services/NetworkService';

export const fetchContracts = createAsyncThunk('/contracts/search', async () => {
  const response = await NetworkService.GET('/contracts');
  console.log(response.data);
  return response.data;
});
