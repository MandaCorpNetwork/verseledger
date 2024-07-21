import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { closeWidget, openWidget } from './widgets.actions';

type WidgetState = {
  [name: string]: {
    open: boolean;
    props?: Record<string, unknown>;
    position: { x: number; y: number };
  };
};

const widgetsReducer = createSlice({
  name: 'widgets',
  initialState: {} as WidgetState,
  reducers: {
    setPosition: (
      state,
      action: PayloadAction<{ name: string; position: { x: number; y: number } }>,
    ) => {
      const { name, position } = action.payload;
      if (state[name]) {
        state[name].position = position;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(openWidget, (state, action) => {
        state[action.payload.name] = {
          ...action.payload.state,
          position: { x: 0, y: 0 },
        };
      })
      .addCase(closeWidget, (state, action) => {
        state[action.payload.name] = {
          ...action.payload.state,
          position: { x: 0, y: 0 },
        };
      })
      .addMatcher(
        (action: Action) => action.type.endsWith('fulfilled'),
        (state, action) => {
          const wName = action.type.split('/fulfilled')[0];
          if (state[wName] != undefined) {
            state[wName] = { open: false, props: {}, position: { x: 0, y: 0 } };
          }
        },
      );
  },
});

export default widgetsReducer;
export const actions = widgetsReducer.actions;
