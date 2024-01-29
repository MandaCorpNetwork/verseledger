import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { isDev } from '../Utils/isDev';
import { coreReducer } from './reducers';

export default configureStore({
  reducer: coreReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      immutableCheck: false,
    });
    middleware.push(thunkMiddleware);
    if (isDev()) middleware.push(createLogger());
    return middleware;
  },
});
