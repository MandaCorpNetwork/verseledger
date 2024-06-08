import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import NetworkService from '@/Services/NetworkService';

export const POST_NEW_CONTRACT = 'POST v1/contracts';

export const postNewContract = createAsyncThunk(
  POST_NEW_CONTRACT,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (contractData: IContract, { getState }) => {
    try {
      const response = await NetworkService.POST(
        '/v1/contracts',
        contractData,
        AuthUtil.getAccessHeader(),
      );
      return response.data;
    } catch (error) {
      console.error('Error creating contract:', error);
      throw error;
    }
  },
);
