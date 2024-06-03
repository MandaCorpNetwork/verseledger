import { type RootState } from '@store';
export const selectPopup = (state: RootState, name: string) => {
  const popup = state.popups[name];
  if (popup == null) return { open: false, props: {} };
  return popup;
};
