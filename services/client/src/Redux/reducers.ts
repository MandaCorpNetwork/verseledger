import { combineReducers } from 'redux';

import authReducer from './Slices/Auth/auth.reducer';
import contractsReducer from './Slices/Contracts/contracts.reducer';
import locationsReducer from './Slices/Locations/locations.reducer';
import popupsReducer from './Slices/Popups/popups.reducer';
import searchUsersReducer from './Slices/Users/searchUsers.reducer';
import usersReducer from './Slices/Users/users.reducer';

export const coreReducer = combineReducers({
  contracts: contractsReducer.reducer,
  auth: authReducer.reducer,
  popups: popupsReducer.reducer,
  users: usersReducer.reducer,
  locations: locationsReducer.reducer,
  searchUsers: searchUsersReducer.reducer,
});
