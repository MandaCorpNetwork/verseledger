import { contractActions } from '@Redux/Slices/Contracts/contracts.reducer';
import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import { Logger } from '@Utils/Logger';
import { IContractBid } from 'vl-shared/src/schemas/contracts/ContractBidSchema';

import { bidActions } from '../bids.reducer';

export const updateBid = createAsyncThunk(
  '/v1/contracts/${contractId}/bids/${bidId}',
  async (
    {
      contractId,
      bidId,
      bidData,
    }: {
      contractId: string;
      bidId: string;
      bidData: Partial<IContractBid>;
    },
    { dispatch },
  ) => {
    try {
      const response = await NetworkService.PATCH<IContractBid, Partial<IContractBid>>(
        `/v1/contracts/${contractId}/bids/${bidId}`,
        bidData,
        AuthUtil.getAccessHeader(),
      );
      dispatch(bidActions.updateBid(response.data));
      dispatch(contractActions.upsertBid(response.data));
      return response.data;
    } catch (error) {
      Logger.error(`Error updating bid: ${error}`);
    }
  },
);
