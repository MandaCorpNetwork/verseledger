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

export const selectLocationsByParams = createSelector(
  [selectLocationsArray, (_, params: Partial<ILocation>) => params],
  (locations, params) => {
    return locations.filter((location) => {
      return Object.entries(params).every(
        ([key, value]) => location[key as keyof ILocation] === value,
      );
    });
  },
);

export const selectParentLocations = createSelector(
  [selectLocationsArray],
  (locations) => {
    return locations.filter((location) => location.category === 'Parent');
  },
);

export const selectOMs = createSelector([selectLocationsArray], (locations) => {
  return locations.filter((location) => location.short_name === `^OM/d/i`);
});
