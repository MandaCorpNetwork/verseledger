import { createSlice } from '@reduxjs/toolkit';
import { IDestination, IMission } from 'vl-shared/src/schemas/RoutesSchema';

import { addDestinations, updateDestinations } from './actions/destinationActions';
import { createMission, updateMission } from './actions/missionActions';

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
      });
  },
});

export default routesReducer;
export const actions = routesReducer.actions;
