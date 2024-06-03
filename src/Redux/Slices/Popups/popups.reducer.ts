import { Action, createSlice } from '@reduxjs/toolkit';

import { closePopup, openPopup } from './popups.actions';
type PopupState = {
  [name: string]: { open: boolean; props?: Record<string, unknown> };
};

const popupsReducer = createSlice({
  name: 'popups',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: {} as PopupState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(openPopup, (state, action) => {
        state[action.payload.name] = action.payload.state;
      })
      .addCase(closePopup, (state, action) => {
        state[action.payload.name] = action.payload.state;
      })
      .addMatcher(
        (action: Action) => action.type.endsWith('fulfilled'),
        (state, action) => {
          const pName = action.type.split('/fulfilled')[0];
          if (state[pName] != undefined) {
            state[pName] = { open: false, props: {} };
          }
        },
      );
  },
});

export default popupsReducer;
export const actions = popupsReducer.actions;
