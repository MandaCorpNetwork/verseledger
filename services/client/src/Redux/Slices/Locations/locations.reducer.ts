import { createSlice } from '@reduxjs/toolkit';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

import { fetchLocations } from './actions/fetchLocations';
const locationsReducer = createSlice({
  name: 'locations',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: {} as Record<ILocation['id'], ILocation>,
  reducers: {
    noop() {
      return {};
    },
    insert(state, location) {
      state[location.payload.id as string] = location.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchLocations.fulfilled, (_state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const location of action.payload as ILocation[]) {
        _state[location.id] = location;
      }
    });
  },
});

export default locationsReducer;
export const actions = locationsReducer.actions;
