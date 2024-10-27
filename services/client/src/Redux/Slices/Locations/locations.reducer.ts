import { createSlice } from '@reduxjs/toolkit';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

import { fetchLocations } from './actions/fetchLocations.action';
import { fetchSearchedLocations } from './actions/fetchSearchedLocations.action';
const locationsReducer = createSlice({
  name: 'locations',
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
        const locations = action.payload;
        for (const location of locations) {
          _state[location.id] = location;
        }
      })
      .addCase(fetchSearchedLocations.fulfilled, (_state, action) => {
        const locations = action.payload?.data;
        if (locations) {
          for (const location of locations) {
            _state[location.id] = {
              ..._state[location.id],
              ...location,
            };
          }
        }
      });
  },
});

export default locationsReducer;
export const actions = locationsReducer.actions;
