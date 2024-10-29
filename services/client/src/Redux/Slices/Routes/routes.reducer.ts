import { createSlice } from '@reduxjs/toolkit';
import { IDestination, IMission, ITask } from 'vl-shared/src/schemas/RoutesSchema';

import { deleteDestination, updateDestinations } from './actions/destination.action';
import { createMission, updateMissions } from './actions/mission.action';
import { addTasks, updateTasks } from './actions/task.action';

const routesReducer = createSlice({
  name: 'routes',
  initialState: {
    destinations: {} as Record<string, IDestination>,
    missions: {} as Record<string, IMission>,
    tasks: {} as Record<string, ITask>,
  },
  reducers: {
    noop() {
      return {
        destinations: {},
        missions: {},
        tasks: {},
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
      .addCase(addTasks, (state, action) => {
        const taskArray = action.payload;
        taskArray.forEach((task: ITask) => {
          state.tasks[task.id] = task;
        });
      })
      .addCase(updateTasks, (state, action) => {
        const updatedTasks = action.payload;

        updatedTasks.forEach((task) => {
          if (state.tasks[task.id]) {
            state.tasks[task.id] = {
              ...state.tasks[task.id],
              ...task,
            };
          } else {
            state.tasks[task.id] = task;
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
