import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';
import { Logger } from '@Utils/Logger';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';

import NetworkService from '@/Services/NetworkService';

export const updateContract = createAsyncThunk(
  'v1/contracts/${contractId}',
  async ({
    contractId,
    contractRaw,
  }: {
    contractId: string;
    contractRaw: Partial<IContract>;
  }) => {
    try {
      const response = await NetworkService.PATCH<IContract, Partial<IContract>>(
        `/v1/contracts/${contractId}`,
        contractRaw,
        AuthUtil.getAccessHeader(),
      );
      return response.data;
    } catch (error) {
      Logger.error(`Error updating contract: ${error}`);
    }
  },
);
