import { RootState } from '@Redux/store';
import { destinationsAdapter, tasksAdapter } from './routes.adapters';

const destinationsSelectors = destinationsAdapter.getSelectors(
  (state: RootState) => state.routes.destinations,
);

const taskSelectors = tasksAdapter.getSelectors((state: RootState) => state.routes.tasks);

import { destinationsAdapter, tasksAdapter } from './routes.adapters';

const destinationsSelectors = destinationsAdapter.getSelectors(
  (state: RootState) => state.routes.destinations,
);

const taskSelectors = tasksAdapter.getSelectors((state: RootState) => state.routes.tasks);

export const selectDestinations = destinationsSelectors.selectAll;

export const selectTasks = taskSelectors.selectAll;

export const routingActive = (state: RootState) => state.routes.activeRoute.active;

export const currentRouteStop = (state: RootState) => state.routes.activeRoute.stop;

export const currentRouteLoad = (state: RootState) =>
  state.routes.activeRoute.currentLoad;
