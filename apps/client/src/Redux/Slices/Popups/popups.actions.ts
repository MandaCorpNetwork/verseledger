import { createAction } from '@reduxjs/toolkit';

import { PopupConstants } from './popups.constants';

export const openPopup = createAction(
  PopupConstants.OPEN_POPUP,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (popupName: string, props?: Record<string, any>) => {
    return {
      payload: {
        name: popupName,
        state: {
          open: true,
          props,
        },
      },
    };
  },
);
export const closePopup = createAction(
  PopupConstants.CLOSE_POPUP,
  (popupName: string) => {
    return {
      payload: {
        name: popupName,
        state: {
          open: false,
          props: {},
        },
      },
    };
  },
);
