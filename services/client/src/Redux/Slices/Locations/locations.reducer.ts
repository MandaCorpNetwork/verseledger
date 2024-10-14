import { createSlice } from '@reduxjs/toolkit';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

import { fetchLocations } from './actions/fetchLocations.action';
import { fetchSearchedLocations } from './actions/fetchSearchedLocations.action';
const locationsReducer = createSlice({
  name: 'locations',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: {} as Record<ILocation['id'], ILocation>,
  reducers: {
    noop() {
      return {};
    },
    insert(state, action) {
      state[action.payload.id as string] = action.payload;
    },
    insertBulk(state, action) {
      const locations = action.payload as ILocation[];
      for (const location of locations) {
        state[location.id] = location;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLocations.fulfilled, (_state, action) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        for (const location of action.payload as ILocation[]) {
          _state[location.id] = location;
        }
      })
      .addCase(fetchSearchedLocations.fulfilled, (_state, action) => {
        const locations = action.payload?.data;
        if (locations) {
          locations.forEach((location) => {
            _state[location.id] = {
              ..._state[location.id],
              ...location,
            };
          });
        }
      });
  },
});

export default locationsReducer;
export const actions = locationsReducer.actions;
