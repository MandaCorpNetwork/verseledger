import { createSlice } from '@reduxjs/toolkit';

import { locationsAdapter } from './locations.adapters';
const locationsReducer = createSlice({
  name: 'locations',
  initialState: locationsAdapter.getInitialState(),
  reducers: {
    noop() {
      return locationsAdapter.getInitialState();
    },
    addLocation(state, action) {
      locationsAdapter.addOne(state, action.payload);
    },
    addLocations(state, action) {
      locationsAdapter.addMany(state, action.payload);
    },
  },
});

export default locationsReducer;
export const locationsActions = locationsReducer.actions;
