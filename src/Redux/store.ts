import { configureStore, Tuple } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import { isDev } from '../Utils/isDev';
import { coreReducer } from './reducers';

export default configureStore({
  reducer: coreReducer,
  devTools: isDev(),
  middleware: (getDefaultMiddleware) =>
    isDev()
      ? new Tuple(...getDefaultMiddleware(), createLogger())
      : new Tuple(...getDefaultMiddleware()),
});
