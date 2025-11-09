import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import { composeQuery } from '@Utils/composeQuery';
import { Logger } from '@Utils/Logger';
import type { IDTOComplete } from 'vl-shared/src/schemas/DTOSchema';
import type { IPaginatedData } from 'vl-shared/src/schemas/IPaginatedData';
import type { ILocation } from 'vl-shared/src/schemas/LocationSchema';
import type { ILocationSearch } from 'vl-shared/src/schemas/SearchSchema';

import { locationsActions } from '../locations.reducer';

export const fetchSearchedLocations = createAsyncThunk(
  '/locations/search',
  async (params: ILocationSearch, { dispatch }) => {
    try {
      const response = await NetworkService.GET<IDTOComplete<IPaginatedData<ILocation>>>(
        `/locations?${composeQuery({ search: params })}`,
        AuthUtil.getAccessHeader(),
      );
      dispatch(locationsActions.addLocations(response.data.data));
      return response.data;
    } catch (error) {
      Logger.error(error);
    }
  },
);
