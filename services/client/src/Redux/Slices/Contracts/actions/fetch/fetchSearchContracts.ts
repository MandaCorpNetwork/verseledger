import { createAsyncThunk } from '@reduxjs/toolkit';

import NetworkService from '@/Services/NetworkService';

export const fetchContractsBySubtypes = createAsyncThunk(
  '/v1/contracts/search',
  async (subtypes: string[]) => {
    const subtypesString = subtypes.join(',');
    const response = await NetworkService.GET('/v1/contracts/search', { subtypesString });
    console.log(response.data);
    return response.data;
  },
);
