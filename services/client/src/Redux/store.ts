import { configureStore } from '@reduxjs/toolkit';

import { isDev } from '../Utils/isDev';
import { coreReducer } from './reducers';
import { updateLocationsMiddleware } from './Slices/Locations/updateLocations';
import { updateUsersMiddleware } from './Slices/Users/updateUsers';

export const setupStore = (preloadState?: Partial<RootState>) =>
  configureStore({
    reducer: coreReducer,
    preloadedState: preloadState,
    devTools: isDev(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(updateLocationsMiddleware, updateUsersMiddleware),
  });
export type RootState = ReturnType<typeof coreReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
