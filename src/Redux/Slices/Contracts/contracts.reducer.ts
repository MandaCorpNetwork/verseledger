import { createSlice } from '@reduxjs/toolkit';

import { fetchContracts } from './contractThunks';

const contractsReducer = createSlice({
  name: 'contracts',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: [] as any[],
  reducers: {
    noop() {
      return [];
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchContracts.fulfilled, (_state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return action.payload as any;
    });
  },
});

export default contractsReducer;
export const actions = contractsReducer.actions;
