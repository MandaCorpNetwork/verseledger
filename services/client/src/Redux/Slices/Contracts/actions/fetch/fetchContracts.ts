import { createAsyncThunk } from '@reduxjs/toolkit';
import { Logger } from '@Utils/Logger';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';
import { IContractSearch } from 'vl-shared/src/schemas/SearchSchema';

import NetworkService from '@/Services/NetworkService';

export const fetchContracts = createAsyncThunk(
  '/v1/contracts/search',
  async (params: IContractSearch) => {
    try {
      const builder = new URLSearchParams();
      Object.keys(params).forEach((key) => {
        const value = params[key as keyof IContractSearch];
        if (value != null) {
          builder.append(
            `search[${key}]`,
            Array.isArray(value) ? value.join(',') : (value as unknown as string),
          );
        }
      });
      const response = await NetworkService.GET(`/v1/contracts?${builder.toString()}`);
      return response.data as IContract[];
    } catch (error) {
      Logger.error(error);
    }
  },
);
