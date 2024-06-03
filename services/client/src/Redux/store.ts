import { configureStore } from '@reduxjs/toolkit';

import { isDev } from '../Utils/isDev';
import { coreReducer } from './reducers';

export const setupStore = (preloadState?: Partial<RootState>) =>
  configureStore({
    reducer: coreReducer,
    preloadedState: preloadState,
    devTools: isDev(),
  });
export type RootState = ReturnType<typeof coreReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
