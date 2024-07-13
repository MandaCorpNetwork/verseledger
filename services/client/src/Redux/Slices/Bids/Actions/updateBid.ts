import { createAsyncThunk } from '@reduxjs/toolkit';
import { Logger } from '@Utils/Logger';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';

import NetworkService from '@/Services/NetworkService';

export const updateBid = createAsyncThunk(
  '/v1/contracts/bids/update',
  async ({
    contractId,
    bidId,
    bidData,
  }: {
    contractId: string;
    bidId: string;
    bidData: IContractBid;
  }) => {
    try {
      const response = await NetworkService.PATCH<IContractBid, IContractBid>(
        `/contracts/${contractId}/bids/${bidId}`,
        bidData,
      );
      return response.data;
    } catch (error) {
      Logger.error(`Error updating bid: ${error}`);
    }
  },
);
