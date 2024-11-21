import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import { composeQuery } from '@Utils/composeQuery';
import { Logger } from '@Utils/Logger';
import { IContractBid } from 'vl-shared/src/schemas/contracts/ContractBidSchema';
import { IUserBidSearch } from 'vl-shared/src/schemas/contracts/ContractSearchSchema';
import { IPaginatedData } from 'vl-shared/src/schemas/IPaginatedData';

export const fetchContractBidsOfUser = createAsyncThunk(
  'GET /v1/users/userId/bids',
  async (params: IUserBidSearch) => {
    try {
      const response = await NetworkService.GET(
        `/v1/users/@me/bids?${composeQuery({ search: params })}`,
        AuthUtil.getAccessHeader(),
      );
      return response.data as IPaginatedData<IContractBid>;
    } catch (error) {
      Logger.error(`Error fetching contract bids: ${error}`);
      throw error;
    }
  },
);
