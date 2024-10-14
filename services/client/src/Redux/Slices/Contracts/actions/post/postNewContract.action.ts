import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';
import { Logger } from '@Utils/Logger';
import { ICreateContractBody } from 'vl-shared/src/schemas/ContractSchema';

import NetworkService from '@/Services/NetworkService';

export const POST_NEW_CONTRACT = 'POST v1/contracts';

export const postNewContract = createAsyncThunk(
  POST_NEW_CONTRACT,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (contractData: ICreateContractBody) => {
    try {
      Logger.info('ContractData Post Attempt: ', contractData);
      const response = await NetworkService.POST(
        '/v1/contracts',
        contractData,
        AuthUtil.getAccessHeader(),
      );
      return response.data;
    } catch (error) {
      Logger.error('Error creating contract:', error);
    }
  },
);
