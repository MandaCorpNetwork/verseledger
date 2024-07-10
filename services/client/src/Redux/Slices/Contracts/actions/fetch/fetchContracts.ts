import { createAsyncThunk } from '@reduxjs/toolkit';
import { composeQuery } from '@Utils/composeQuery';
import { Logger } from '@Utils/Logger';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';
import { IContractSearch } from 'vl-shared/src/schemas/SearchSchema';

import NetworkService from '@/Services/NetworkService';

export const fetchContracts = createAsyncThunk(
  '/v1/contracts/search',
  async (params: IContractSearch) => {
    try {
      const response = await NetworkService.GET(
        `/v1/contracts?${composeQuery({ search: params })}`,
      );
      return response.data as IContract[];
    } catch (error) {
      Logger.error(error);
    }
  },
);
