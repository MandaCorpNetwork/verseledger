import { createSlice } from '@reduxjs/toolkit';
import { IDestination, IMission, IObjective } from 'vl-shared/src/schemas/RoutesSchema';

import {
  addDestinations,
  deleteDestination,
  replaceDestinations,
  updateDestinations,
} from './actions/destination.action';
import { abandonMission, createMission, updateMission } from './actions/mission.action';
import { updateObjective } from './actions/objective.action';

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
      })
      .addCase(abandonMission, (state, action) => {
        const abandonedMission = action.payload;

        delete state.missions[abandonedMission.missionId];

        const filteredDestinationsArray = Object.values(state.destinations).filter(
          (destination) => {
            if (Array.isArray(destination.objectives)) {
              destination.objectives = destination.objectives.filter(
                (objective: IObjective) =>
                  !abandonedMission.objectives.some(
                    (abandoned) => abandoned.packageId === objective.packageId,
                  ),
              );
              if (
                destination.reason === 'Mission' &&
                (!destination.objectives || destination.objectives.length === 0)
              ) {
                return false;
              }
              return true;
            }
          },
        );
        state.destinations = filteredDestinationsArray.reduce<
          Record<string, IDestination>
        >((acc, destination) => {
          acc[destination.id] = destination;
          return acc;
        }, {});
      });
  },
});

export default routesReducer;
export const actions = routesReducer.actions;
