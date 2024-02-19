import { createSlice } from '@reduxjs/toolkit';

import { IContract } from '../../../../../verseledger-backend/src/interfaces/IContract';
import { fetchContracts } from './contractThunks';
const initialState: Array<IContract> = [];
const contractsReducer = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    noop() {
      return [];
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchContracts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default contractsReducer;
export const actions = contractsReducer.actions;
