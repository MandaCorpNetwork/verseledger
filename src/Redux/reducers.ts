import { combineReducers } from 'redux';

import contractsReducer from './Slices/Contracts/contracts.reducer';
export const coreReducer = combineReducers({
  contracts: contractsReducer.reducer,
});
