import type { RootState } from '@Redux/store';
import { createSelector } from '@reduxjs/toolkit';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

import { selectContractsArray } from '../Contracts/contractSelectors';

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

export const selectContractLocationById = createSelector(
  [selectContractsArray, (_, locationId: string) => locationId],
  (contracts, locationId: string) => {
    for (const contract of contracts) {
      if (contract.Locations) {
        const location = contract.Locations.find((loc) => loc.id === locationId);
        if (location) {
          return location;
        }
      }
    }
    return null;
  },
);
