import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDestination, IMission } from 'vl-shared/src/schemas/RoutesSchema';

const routesReducer = createSlice({
  name: 'routes',
  initialState: {
    destinations: {} as Record<number, IDestination>,
    missions: {} as Record<string, IMission>,
  },
  reducers: {
    noop() {
      return {
        destinations: {},
        missions: {},
      };
    },
    addMission: (state, action: PayloadAction<IMission>) => {
      const mission = action.payload;
      state.missions[mission.missionId] = mission;
    },
    addDestination: (state, action: PayloadAction<IDestination>) => {
      const destination = action.payload;
      state.destinations[destination.stopNumber] = destination;
    },
  },
  extraReducers() {},
});

export default routesReducer;

export const { addMission, addDestination } = routesReducer.actions;
