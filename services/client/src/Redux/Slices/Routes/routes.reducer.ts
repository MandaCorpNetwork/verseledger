import { createSlice } from '@reduxjs/toolkit';
import {
  IDestination,
  ILogisticTransport,
  IMission,
  IObjective,
  IUserTransport,
} from 'vl-shared/src/schemas/RoutesSchema';

import { deleteDestination, updateDestinations } from './actions/destination.action';
import { createMission, updateMissions } from './actions/mission.action';
import { addObjectives, updateObjectives } from './actions/objective.action';

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
      .addCase(updateMissions, (state, action) => {
        const updatedMissions = action.payload;
        updatedMissions.forEach((mission) => {
          if (state.missions[mission.id]) {
            state.missions[mission.id] = {
              ...state.missions[mission.id],
              ...mission,
            };
          } else {
            state.missions[mission.id] = mission;
          }
        });
      })
      .addCase(addObjectives, (state, action) => {
        const objectiveArray = action.payload.objectives;
        objectiveArray.forEach((objective: IObjective) => {
          state.objectives[objective.id] = objective;
        });
      })
      .addCase(updateObjectives, (state, action) => {
        const updatedObjectives = action.payload;

        updatedObjectives.forEach((objective) => {
          if (state.objectives[objective.id]) {
            state.objectives[objective.id] = {
              ...state.objectives[objective.id],
              ...objective,
            };
          } else {
            state.objectives[objective.id] = objective;
          }
        });
      })
      .addCase(updateDestinations, (state, action) => {
        const destinationArray = action.payload;
        destinationArray.forEach((destination: IDestination) => {
          state.destinations[destination.id] = destination;
        });
      })
      .addCase(deleteDestination, (state, action) => {
        const destinationId = action.payload;
        delete state.destinations[destinationId];
      });
  },
});

export default routesReducer;
export const actions = routesReducer.actions;
