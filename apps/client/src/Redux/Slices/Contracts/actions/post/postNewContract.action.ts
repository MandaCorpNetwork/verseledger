import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import { Logger } from '@Utils/Logger';
import type { ICreateContractBody } from 'vl-shared/src/schemas/contracts/ContractSchema';

import { contractActions } from '../../contracts.reducer';

export const POST_NEW_CONTRACT = 'POST v1/contracts';

export const postNewContract = createAsyncThunk(
  POST_NEW_CONTRACT,

  async (contractData: ICreateContractBody, { dispatch }) => {
    try {
      const response = await NetworkService.POST(
        '/contracts',
        contractData,
        AuthUtil.getAccessHeader(),
      );
      dispatch(contractActions.addContract(response.data));
      return response.data;
    } catch (error) {
      Logger.error('Error creating contract:', error);
    }
  },
);
