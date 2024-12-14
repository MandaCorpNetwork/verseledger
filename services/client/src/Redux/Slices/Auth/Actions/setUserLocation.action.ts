import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ILocation } from 'vl-shared/src/schemas/LocationSchema';

export const setUserLocation = createAsyncThunk(
  'auth/setUserLocation',
  async (location: ILocation) => {
    return location;
  },
);
