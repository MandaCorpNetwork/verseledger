import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';
import { Logger } from '@Utils/Logger';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';

import NetworkService from '@/Services/NetworkService';

export const updateContract = createAsyncThunk(
  'v1/contracts/${contractId}',
  async ({
    contractId,
    contractRaw,
  }: {
    contractId: string;
    contractRaw: Partial<IContractBid>;
  }) => {
    try {
      const response = await NetworkService.PATCH<IContractBid, Partial<IContractBid>>(
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
