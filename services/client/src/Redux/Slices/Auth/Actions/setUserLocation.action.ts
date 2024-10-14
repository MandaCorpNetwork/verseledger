import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

export const setUserLocation = createAsyncThunk(
  'auth/setUserLocation',
  async (location: ILocation) => {
    return location;
  },
);
