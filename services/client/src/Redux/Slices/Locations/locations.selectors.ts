import type { RootState } from '@Redux/store';
import { createSelector } from '@reduxjs/toolkit';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

import { locationsAdapter } from './locations.adapters';

export const locationsSelectors = locationsAdapter.getSelectors(
  (state: RootState) => state.locations,
);

export const selectLocations = locationsSelectors.selectAll;

export const selectLocationById = locationsSelectors.selectById;

export const selectLocationsByParams = createSelector(
  [selectLocations, (_, params: Partial<ILocation>) => params],
  (locations, params) => {
    return locations.filter((location) => {
      return Object.entries(params).every(
        ([key, value]) => location[key as keyof ILocation] === value,
      );
    });
  },
);

export const selectParentLocations = createSelector([selectLocations], (locations) => {
  return locations.filter((location) => location.category === 'Parent');
});

export const selectOMs = createSelector([selectLocations], (locations) => {
  return locations.filter((location) => location.short_name === `^OM/d/i`);
});
