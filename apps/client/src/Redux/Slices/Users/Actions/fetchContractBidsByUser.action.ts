import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import { composeQuery } from '@Utils/composeQuery';
import { Logger } from '@Utils/Logger';
import type { IContractBid } from 'vl-shared/src/schemas/contracts/ContractBidSchema';
import type { IUserBidSearch } from 'vl-shared/src/schemas/contracts/ContractSearchSchema';
import type { IPaginatedData } from 'vl-shared/src/schemas/IPaginatedData';

export const fetchContractBidsOfUser = createAsyncThunk(
  'GET /users/userId/bids',
  async (params: IUserBidSearch) => {
    try {
      const response = await NetworkService.GET(
        `/users/@me/bids?${composeQuery({ search: params })}`,
        AuthUtil.getAccessHeader(),
      );
      return response.data as IPaginatedData<IContractBid>;
    } catch (error) {
      Logger.error(`Error fetching contract bids: ${error}`);
      throw error;
    }
  },
);
