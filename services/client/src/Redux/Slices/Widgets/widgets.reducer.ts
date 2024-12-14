import { type Action, createSlice } from '@reduxjs/toolkit';

import { closeWidget, openWidget } from './widgets.actions';

type WidgetState = {
  [name: string]: {
    open: boolean;
    props?: Record<string, unknown>;
  };
};

const widgetsReducer = createSlice({
  name: 'widgets',
  initialState: {} as WidgetState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(openWidget, (state, action) => {
        state[action.payload.name] = {
          ...action.payload.state,
        };
      })
      .addCase(closeWidget, (state, action) => {
        state[action.payload.name] = {
          ...action.payload.state,
        };
      })
      .addMatcher(
        (action: Action) => action.type.endsWith('fulfilled'),
        (state, action) => {
          const wName = action.type.split('/fulfilled')[0];
          if (state[wName] != undefined) {
            state[wName] = {
              open: false,
              props: {},
            };
          }
        },
      );
  },
});

export default widgetsReducer;
export const actions = widgetsReducer.actions;
