import { createSlice } from '@reduxjs/toolkit';
import { IFeatureFlag } from 'vl-shared/src/schemas/FeatureFlagSchema';

import { fetchUserFlags } from './Actions/fetchFlags.action';

const flagsReducer = createSlice({
  name: 'flags',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: {} as {
    [key: IFeatureFlag['id']]: IFeatureFlag;
  },
  reducers: {
    noop() {
      return {};
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUserFlags.fulfilled, (_state, action) => {
      const flags = action.payload;
      for (const flag of flags) {
        _state[flag.id] = flag;
      }
    });
  },
});

export default flagsReducer;
export const actions = flagsReducer.actions;
