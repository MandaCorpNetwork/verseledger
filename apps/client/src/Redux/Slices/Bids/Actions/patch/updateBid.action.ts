import { contractActions } from '@Redux/Slices/Contracts/contracts.reducer';
import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import { Logger } from '@Utils/Logger';
import type { IContractBid } from 'vl-shared/src/schemas/contracts/ContractBidSchema';

import { bidsActions } from '../../bids.reducer';

export const updateBid = createAsyncThunk(
  '/contracts/${contractId}/bids/${bidId}',
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
        `/contracts/${contractId}/bids/${bidId}`,
        bidData,
        AuthUtil.getAccessHeader(),
      );
      dispatch(bidsActions.updateBid(response.data));
      dispatch(contractActions.upsertBid(response.data));
      return response.data;
    } catch (error) {
      Logger.error(`Error updating bid: ${error}`);
    }
  },
);
