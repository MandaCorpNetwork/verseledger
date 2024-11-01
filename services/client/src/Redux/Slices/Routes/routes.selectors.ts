import { RootState } from '@Redux/store';

export const selectDestinations = (state: RootState) =>
  Object.values(state.routes.destinations);

export const selectTasks = (state: RootState) => Object.values(state.routes.tasks);
