import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import { IContract } from 'vl-shared/src/schemas/contracts/ContractSchema';

export const updateContract = createAsyncThunk(
  'v1/contracts/${contractId}',
  async ({
    contractId,
    contractRaw,
  }: {
    contractId: string;
    contractRaw: Partial<IContract>;
  }) => {
    const response = await NetworkService.PATCH<IContract, Partial<IContract>>(
      `/v1/contracts/${contractId}`,
      contractRaw,
      AuthUtil.getAccessHeader(),
    );
    return response.data;
  },
);
