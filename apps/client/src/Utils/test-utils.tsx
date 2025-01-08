import { render, type RenderOptions } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import type React from 'react';
import { Provider } from 'react-redux';

import type { AppStore, RootState } from '../Redux/store';
import { setupStore } from '../Redux/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
) => {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;
  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};
