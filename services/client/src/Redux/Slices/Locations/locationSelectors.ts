import type { RootState } from '@Redux/store';
import { createSelector } from '@reduxjs/toolkit';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

export const selectLocations = (state: RootState) => {
  return state.locations;
};
export const selectLocationsArray = createSelector([selectLocations], (locations) => {
  return Object.values(locations);
});

export const selectLocationById = createSelector(
  [selectLocations, (_, id: string) => id],
  (locations, id: string) => {
    return locations[id] as ILocation | null;
  },
);
