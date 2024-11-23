import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import { Logger } from '@Utils/Logger';
import { ICreateContractBody } from 'vl-shared/src/schemas/contracts/ContractSchema';

import { contractActions } from '../../contracts.reducer';

export const POST_NEW_CONTRACT = 'POST v1/contracts';

export const postNewContract = createAsyncThunk(
  POST_NEW_CONTRACT,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (contractData: ICreateContractBody, { dispatch }) => {
    try {
      const response = await NetworkService.POST(
        '/v1/contracts',
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
