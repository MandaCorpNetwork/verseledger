import { combineReducers } from 'redux';

import authReducer from './Slices/Auth/auth.reducer';
import contractsReducer from './Slices/Contracts/contracts.reducer';

export const coreReducer = combineReducers({
  contracts: contractsReducer.reducer,
  auth: authReducer.reducer,
});
