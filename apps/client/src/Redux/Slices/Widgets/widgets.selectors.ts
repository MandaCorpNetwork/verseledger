import type { RootState } from '@store';
export const selectWidget = (state: RootState, name: string) => {
  const widget = state.widgets[name];
  if (widget == null) return { open: false, props: {} };
  return widget;
};
