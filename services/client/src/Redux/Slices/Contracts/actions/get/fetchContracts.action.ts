import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import { composeQuery } from '@Utils/composeQuery';
import { Logger } from '@Utils/Logger';
import { IContract } from 'vl-shared/src/schemas/contracts/ContractSchema';
import { IContractSearch } from 'vl-shared/src/schemas/contracts/ContractSearchSchema';
import { IDTOComplete } from 'vl-shared/src/schemas/DTOSchema';
import { IPaginatedData } from 'vl-shared/src/schemas/IPaginatedData';

import { contractActions } from '../../contracts.reducer';

export const fetchContracts = createAsyncThunk(
  '/v1/contracts/search',
  async (params: IContractSearch, { dispatch }) => {
    try {
      const response = await NetworkService.GET<IDTOComplete<IPaginatedData<IContract>>>(
        `/v1/contracts?${composeQuery({ search: params })}`,
        AuthUtil.getAccessHeader(),
      );
      const contracts = response.data.data;

      const userSet
      // const owners = contracts.map((contract) => contract.)
      dispatch(contractActions.addContracts(contracts));
      return response.data;
    } catch (error) {
      Logger.error(error);
    }
  },
);
