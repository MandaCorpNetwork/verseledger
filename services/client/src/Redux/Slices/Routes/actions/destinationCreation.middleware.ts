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

      const state = getState();

      mission.objectives.forEach((objective: IObjective) => {
        // Process the pickup location as a destination
        if (objective.pickup && !state.routes.destinations[objective.pickup.id]) {
          const pickupDestination: IDestination = {
            stopNumber: Object.keys(state.routes.destinations).length + 1,
            location: objective.pickup,
            reason: 'Pickup', // Customize this based on your use case
            objectives: mission.objectives.filter(
              (obj) =>
                obj.pickup?.id === objective.pickup.id ||
                obj.dropOff?.id === objective.pickup.id,
            ),
            contract: {} as IContract, // Populate as needed
          };

          // Dispatch the new pickup destination
          dispatch(addDestination(pickupDestination));
        }

        // Process the dropoff location as a destination
        if (objective.dropOff && !state.routes.destinations[objective.dropOff.id]) {
          const dropOffDestination: IDestination = {
            stopNumber: Object.keys(state.routes.destinations).length + 1,
            location: objective.dropOff,
            reason: 'Dropoff', // Customize this based on your use case
            objectives: mission.objectives.filter(
              (obj) =>
                obj.pickup?.id === objective.dropOff.id ||
                obj.dropOff?.id === objective.dropOff.id,
            ),
            contract: {} as IContract, // Populate as needed
          };

          // Dispatch the new dropoff destination
          dispatch(addDestination(dropOffDestination));
        }
      });
    }

    return result;
  };
