import { type RootState } from '@store';
export const selectWidget = (state: RootState, name: string) => {
  const widget = state.widgets[name];
  if (widget == null) return { open: false, props: {} };
  return widget;
};

export const selectWidgetPosition = (state: RootState, name: string) => {
  const widget = state.widgets[name];
  if (widget && widget.position) {
    return widget.position;
  }
  return { x: 0, y: 0 };
};
