import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import { composeQuery } from '@Utils/composeQuery';
import { Logger } from '@Utils/Logger';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';
import { IPaginatedData } from 'vl-shared/src/schemas/IPaginatedData';
import { IContractSearch } from 'vl-shared/src/schemas/SearchSchema';

export const fetchContracts = createAsyncThunk(
  '/v1/contracts/search',
  async (params: IContractSearch) => {
    try {
      const response = await NetworkService.GET(
        `/v1/contracts?${composeQuery({ search: params })}`,
        AuthUtil.getAccessHeader(),
      );
      return response.data as IPaginatedData<IContract>;
    } catch (error) {
      Logger.error(error);
    }
  },
);
