import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import { composeQuery } from '@Utils/composeQuery';
import { Logger } from '@Utils/Logger';
import { IDTOComplete } from 'vl-shared/src/schemas/DTOSchema';
import { IPaginatedData } from 'vl-shared/src/schemas/IPaginatedData';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';
import { ILocationSearch } from 'vl-shared/src/schemas/SearchSchema';

import { locationsActions } from '../locations.reducer';

export const fetchSearchedLocations = createAsyncThunk(
  '/v1/locations/search',
  async (params: ILocationSearch, { dispatch }) => {
    try {
      const response = await NetworkService.GET<IDTOComplete<IPaginatedData<ILocation>>>(
        `/v1/locations?${composeQuery({ search: params })}`,
        AuthUtil.getAccessHeader(),
      );
      dispatch(locationsActions.addLocations(response.data.data));
      return response.data;
    } catch (error) {
      Logger.error(error);
    }
  },
);
