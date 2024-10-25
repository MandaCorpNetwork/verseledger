import { createSlice } from '@reduxjs/toolkit';
import {
  IDestination,
  ILogisticTransport,
  IMission,
  IObjective,
  IUserTransport,
} from 'vl-shared/src/schemas/RoutesSchema';

import {
  addDestinations,
  deleteDestination,
  replaceDestinations,
  updateDestinations,
} from './actions/destination.action';
import { abandonMission, createMission, updateMission } from './actions/mission.action';
import { addObjectives, updateObjective } from './actions/objective.action';

const routesReducer = createSlice({
  name: 'routes',
  initialState: {
    destinations: {} as Record<string, IDestination>,
    missions: {} as Record<string, IMission>,
    objectives: {} as Record<string, IObjective>,
  },
  reducers: {
    noop() {
      return {
        destinations: {},
        missions: {},
        objectives: {},
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createMission, (state, action) => {
        const mission = action.payload;
        state.missions[mission.id] = mission;
      })
      .addCase(addObjectives, (state, action) => {
        const objectiveArray = action.payload.objectives;
        objectiveArray.forEach((objective: IObjective) => {
          state.objectives[objective.id] = objective;
        });
      })
      .addCase(updateDestinations, (state, action) => {
        const destinationArray = action.payload;
        destinationArray.forEach((destination: IDestination) => {
          state.destinations[destination.id] = destination;
        });
      });
  },
});

export default routesReducer;
export const actions = routesReducer.actions;
