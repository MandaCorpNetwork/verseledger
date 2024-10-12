import { createSlice } from '@reduxjs/toolkit';
import { IDestination, IMission } from 'vl-shared/src/schemas/RoutesSchema';

import {
  addDestinations,
  deleteDestination,
  replaceDestinations,
  updateDestinations,
} from './actions/destinationActions';
import { createMission, updateMission } from './actions/missionActions';
import { updateObjective } from './actions/objectiveActions';

const routesReducer = createSlice({
  name: 'routes',
  initialState: {
    destinations: {} as Record<string, IDestination>,
    missions: {} as Record<string, IMission>,
  },
  reducers: {
    noop() {
      return {
        destinations: {},
        missions: {},
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createMission, (state, action) => {
        const mission = action.payload;
        state.missions[mission.missionId] = mission;
      })
      .addCase(updateMission, (state, action) => {
        const updatedMission = action.payload;
        if (state.missions[updatedMission.missionId]) {
          state.missions[updatedMission.missionId] = {
            ...state.missions[updatedMission.missionId],
            ...updatedMission,
          };
        }
      })
      .addCase(addDestinations, (state, action) => {
        const destinations = action.payload;
        if (destinations) {
          destinations.forEach((destination) => {
            state.destinations[destination.id] = destination;
          });
        }
      })
      .addCase(updateDestinations, (state, action) => {
        const updatedDestinations = action.payload;
        if (updatedDestinations) {
          updatedDestinations.forEach((destination) => {
            if (state.destinations[destination.id]) {
              state.destinations[destination.id] = {
                ...state.destinations[destination.id],
                ...destination,
              };
            }
          });
        }
      })
      .addCase(replaceDestinations, (state, action) => {
        const newDestinations = action.payload;
        if (newDestinations) {
          state.destinations = {};
          newDestinations.forEach((destination) => {
            state.destinations[destination.id] = destination;
          });
        }
      })
      .addCase(updateObjective, (state, action) => {
        const updatedObjective = action.payload.objective;
        const missionId = action.payload.missionId;
        const destinationId = action.payload.destinationId;

        const mission = state.missions[missionId];
        if (mission) {
          const objectiveIndex = mission.objectives.findIndex(
            (obj) => obj.packageId === updatedObjective.packageId,
          );
          if (objectiveIndex !== -1) {
            mission.objectives[objectiveIndex] = {
              ...updatedObjective,
            };
          }
        }
        const destination = state.destinations[destinationId];
        if (destination) {
          if (destination.objectives) {
            const objectiveIndex = destination.objectives?.findIndex(
              (obj) => obj.packageId === updatedObjective.packageId,
            );
            if (objectiveIndex !== -1) {
              destination.objectives[objectiveIndex] = {
                ...updatedObjective,
              };
            }
          }
        }
      })
      .addCase(deleteDestination, (state, action) => {
        const destinationId = action.payload;

        delete state.destinations[destinationId];
      });
  },
});

export default routesReducer;
export const actions = routesReducer.actions;
