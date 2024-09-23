import { RootState } from '@Redux/store';

export const selectMissions = (state: RootState) => Object.values(state.routes.missions);

export const selectDestinations = (state: RootState) =>
  Object.values(state.routes.destinations);
