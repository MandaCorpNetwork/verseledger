import NetworkService from '@/Services/NetworkService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContracts = createAsyncThunk('/contracts/search', async () => {
  const response = await NetworkService.GET<IContract[]>('/contracts');
  console.log(response.data)
  return response.data;
});