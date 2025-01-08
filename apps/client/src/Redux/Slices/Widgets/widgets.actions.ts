import { createAction } from '@reduxjs/toolkit';

import { WidgetConstants } from './widgets.constants';

export const openWidget = createAction(
  WidgetConstants.OPEN_WIDGET,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (widgetName: string, props?: Record<string, any>) => {
    return {
      payload: {
        name: widgetName,
        state: {
          open: true,
          props,
        },
      },
    };
  },
);
export const closeWidget = createAction(
  WidgetConstants.CLOSE_WIDGET,
  (widgetName: string) => {
    return {
      payload: {
        name: widgetName,
        state: {
          open: false,
          props: {},
        },
      },
    };
  },
);
