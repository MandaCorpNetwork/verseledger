import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import { composeQuery } from '@Utils/composeQuery';
import { IContractBid } from 'vl-shared/src/schemas/contracts/ContractBidSchema';
import { IUserBidSearch } from 'vl-shared/src/schemas/contracts/ContractSearchSchema';
import { IDTOComplete } from 'vl-shared/src/schemas/DTOSchema';
import { IPaginatedData } from 'vl-shared/src/schemas/IPaginatedData';

import { bidsActions } from '../../bids.reducer';

export const fetchUserBids = createAsyncThunk(
  'GET /v1/users/userId/bids',
  async (params: IUserBidSearch, { dispatch }) => {
    const response = await NetworkService.GET<IDTOComplete<IPaginatedData<IContractBid>>>(
      `/v1/users/${params.userId}/bids?${composeQuery({ search: params })}`,
      AuthUtil.getAccessHeader(),
    );
    const bids = response.data.data;
    dispatch(bidsActions.addBids(bids));
    return response.data;
  },
);
