import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import { IContract } from 'vl-shared/src/schemas/contracts/ContractSchema';

import { contractActions } from '../../contracts.reducer';

export const updateContract = createAsyncThunk(
  'v1/contracts/${contractId}',
  async (
    {
      contractId,
      contractRaw,
    }: {
      contractId: string;
      contractRaw: Partial<IContract>;
    },
    { dispatch },
  ) => {
    const response = await NetworkService.PATCH<IContract, Partial<IContract>>(
      `/v1/contracts/${contractId}`,
      contractRaw,
      AuthUtil.getAccessHeader(),
    );
    dispatch(contractActions.updateContract(response.data));
    return response.data;
  },
);
