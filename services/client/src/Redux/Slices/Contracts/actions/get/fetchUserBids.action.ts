import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthUtil } from '@Utils/AuthUtil';
import { composeQuery } from '@Utils/composeQuery';
import { IContractBid } from 'vl-shared/src/schemas/ContractBidSchema';
import { IDTOComplete } from 'vl-shared/src/schemas/DTOSchema';
import { IPaginatedData } from 'vl-shared/src/schemas/IPaginatedData';
import { IUserBidSearch } from 'vl-shared/src/schemas/SearchSchema';

import NetworkService from '@/Services/NetworkService';

export const fetchUserBids = createAsyncThunk(
  'GET /v1/users/userId/bids',
  async (params: IUserBidSearch) => {
    const response = await NetworkService.GET<IDTOComplete<IPaginatedData<IContractBid>>>(
      `/v1/users/${params.userId}/bids?${composeQuery({ search: params })}`,
      AuthUtil.getAccessHeader(),
    );
    return response.data;
  },
);
