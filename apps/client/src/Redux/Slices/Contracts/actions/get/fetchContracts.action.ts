import { usersActions } from '@Redux/Slices/Users/users.reducer';
import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import { composeQuery } from '@Utils/composeQuery';
import { Logger } from '@Utils/Logger';
import type { IContractWithOwner } from 'vl-shared/src/schemas/contracts/ContractSchema';
import type { IContractSearch } from 'vl-shared/src/schemas/contracts/ContractSearchSchema';
import type { IDTOComplete } from 'vl-shared/src/schemas/DTOSchema';
import type { IPaginatedData } from 'vl-shared/src/schemas/IPaginatedData';

import { contractActions } from '../../contracts.reducer';

export const fetchContracts = createAsyncThunk(
  '/v1/contracts/search',
  async (params: IContractSearch, { dispatch }) => {
    try {
      const response = await NetworkService.GET<
        IDTOComplete<IPaginatedData<IContractWithOwner>>
      >(`/v1/contracts?${composeQuery({ search: params })}`, AuthUtil.getAccessHeader());
      const contracts = response.data.data;

      const userSet = new Set();
      contracts.forEach((contract) => {
        const owner = contract.Owner;
        if (owner) {
          userSet.add(owner);
        }
      });

      const updatedUsers = Array.from(userSet);

      if (updatedUsers.length > 0) {
        dispatch(usersActions.upsertUsers(updatedUsers));
      }
      dispatch(contractActions.replaceContracts(contracts));
      return response.data;
    } catch (error) {
      Logger.error(error);
    }
  },
);
