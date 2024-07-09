import { createAsyncThunk } from '@reduxjs/toolkit';

import NetworkService from '@/Services/NetworkService';

export const fetchContracts = createAsyncThunk('/v1/contracts/search', async () => {
  const response = await NetworkService.GET('/v1/contracts');
  console.log(response.data);
  return response.data;
});

// export const fetchContractBidsByUser = createAsyncThunk(

// )
