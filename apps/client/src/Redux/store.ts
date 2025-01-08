import { configureStore } from '@reduxjs/toolkit';
import { isDev } from '@Utils/isDev';
import { createLogger } from 'redux-logger';

import { coreReducer } from './reducers';
import { updateLocationsMiddleware } from './Slices/Locations/updateLocations.middleware';
// import { destinationCreation } from './Slices/Routes/actions/destinationCreation.middleware';
import { updateUsersMiddleware } from './Slices/Users/updateUsers.middleware';

export const setupStore = (preloadState?: Partial<RootState>) =>
  configureStore({
    reducer: coreReducer,
    preloadedState: preloadState,
    devTools: isDev(),
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware({ serializableCheck: false }).concat(
        updateLocationsMiddleware,
        updateUsersMiddleware,
      );
      if (isDev()) {
        const logger = createLogger({ collapsed: true, logErrors: true });
        middleware.push(logger);
      }
      return middleware;
    },
  });
export type RootState = ReturnType<typeof coreReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
