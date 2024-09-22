import { combineReducers } from 'redux';

import authReducer from './Slices/Auth/auth.reducer';
import bidsReducer from './Slices/Bids/bids.reducer';
import contractsReducer from './Slices/Contracts/contracts.reducer';
import locationsReducer from './Slices/Locations/locations.reducer';
import notificationsReducer from './Slices/Notifications/notifications.reducer';
import popupsReducer from './Slices/Popups/popups.reducer';
import routesReducer from './Slices/Routes/routes.reducer';
import tokensReducer from './Slices/Tokens/tokens.reducer';
import usersReducer from './Slices/Users/users.reducer';
import widgetsReducer from './Slices/Widgets/widgets.reducer';

export const coreReducer = combineReducers({
  contracts: contractsReducer.reducer,
  bids: bidsReducer.reducer,
  auth: authReducer.reducer,
  popups: popupsReducer.reducer,
  widgets: widgetsReducer.reducer,
  users: usersReducer.reducer,
  locations: locationsReducer.reducer,
  notifications: notificationsReducer.reducer,
  tokens: tokensReducer.reducer,
  routes: routesReducer.reducer,
});
