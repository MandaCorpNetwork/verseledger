import { configureStore } from '@reduxjs/toolkit';

import { isDev } from '../Utils/isDev';
import { coreReducer } from './reducers';

const store = configureStore({
  reducer: coreReducer,
  devTools: isDev(),
});

export default store;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
