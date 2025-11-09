import { createAsyncThunk } from '@reduxjs/toolkit';
import NetworkService from '@Services/NetworkService';
import { AuthUtil } from '@Utils/AuthUtil';
import type { ILocation } from 'vl-shared/src/schemas/LocationSchema';

import { locationsActions } from '../locations.reducer';

export const fetchLocations = createAsyncThunk(
  '/locations/all',
  async (_, { dispatch }) => {
    const response = await NetworkService.GET<ILocation[]>(
      '/locations',
      AuthUtil.getAccessHeader(),
    );
    dispatch(locationsActions.addLocations(response.data));
    return response.data;
  },
);
