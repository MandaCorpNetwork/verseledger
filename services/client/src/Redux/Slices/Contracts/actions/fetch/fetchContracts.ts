import { createAsyncThunk } from '@reduxjs/toolkit';
import { Logger } from '@Utils/Logger';
import { IContractSearch } from 'vl-shared/src/schemas/SearchSchema';

import NetworkService from '@/Services/NetworkService';

export const fetchContracts = createAsyncThunk(
  '/v1/contracts/search',
  async (params: IContractSearch) => {
    try {
      const queryParams = JSON.parse(JSON.stringify(params));
      const response = await NetworkService.GET('/v1/contracts/search', queryParams);
      return response.data;
    } catch (error) {
      Logger.error(error);
    }
  },
);
