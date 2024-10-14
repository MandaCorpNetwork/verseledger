import { configureStore } from '@reduxjs/toolkit';
import { isDev } from '@Utils/isDev';

import { coreReducer } from './reducers';
import { updateLocationsMiddleware } from './Slices/Locations/updateLocations.middleware';
// import { destinationCreation } from './Slices/Routes/actions/destinationCreation.middleware';
import { updateUsersMiddleware } from './Slices/Users/updateUsers.middleware';

export const setupStore = (preloadState?: Partial<RootState>) =>
  configureStore({
    reducer: coreReducer,
    preloadedState: preloadState,
    devTools: isDev(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        updateLocationsMiddleware,
        updateUsersMiddleware,
      ),
  });
export type RootState = ReturnType<typeof coreReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
