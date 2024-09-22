import { AppDispatch, RootState } from '@Redux/store';
import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { IContract } from 'vl-shared/src/schemas/ContractSchema';
import { IDestination, IMission, IObjective } from 'vl-shared/src/schemas/RoutesSchema';

import { addDestination } from '../routes.reducer';

export const destinationCreation: Middleware<unknown, RootState> =
  ({ dispatch, getState }: { dispatch: AppDispatch; getState: () => RootState }) =>
  (next) =>
  (action) => {
    const result = next(action);

    if ((action as PayloadAction<IMission>).type === 'routes/addMission') {
      const mission = (action as PayloadAction<IMission>).payload;

      // Collect all unique location IDs from objectives
      const allLocations = mission.objectives.reduce<Set<string>>(
        (locations, obj: IObjective) => {
          if (obj.pickup) locations.add(obj.pickup.id);
          if (obj.dropOff) locations.add(obj.dropOff.id);
          return locations;
        },
        new Set(),
      );

      const state = getState();

      // Process each unique location
      allLocations.forEach((locationId) => {
        if (!state.routes.destinations[locationId]) {
          const relevantObjective = mission.objectives.find(
            (obj: IObjective) =>
              obj.pickup?.id === locationId || obj.dropOff?.id === locationId,
          );

          if (relevantObjective) {
            const destination: IDestination = {
              stopNumber: Object.keys(state.routes.destinations).length + 1,
              location: relevantObjective.pickup || relevantObjective.dropOff!,
              reason: 'Delivery',
              objectives: mission.objectives.filter(
                (obj) => obj.pickup?.id === locationId || obj.dropOff?.id === locationId,
              ),
              contract: {} as IContract, // This needs to be populated as necessary
            };

            // Dispatch the new destination
            dispatch(addDestination(destination));
          }
        }
      });
    }

    return result;
  };
