import { RootState } from '@Redux/store';
import { destinationsAdapter, tasksAdapter } from './routes.adapters';

const destinationsSelectors = destinationsAdapter.getSelectors(
  (state: RootState) => state.routes.destinations,
);

const taskSelectors = tasksAdapter.getSelectors((state: RootState) => state.routes.tasks);

export const selectDestinations = (state: RootState) =>
  Object.values(state.routes.destinations);

export const selectTasks = (state: RootState) => Object.values(state.routes.tasks);

export const routingActive = (state: RootState) => state.routes.activeRoute.active;

export const currentRouteStop = (state: RootState) => state.routes.activeRoute.stop;

export const currentRouteLoad = (state: RootState) =>
  state.routes.activeRoute.currentLoad;
