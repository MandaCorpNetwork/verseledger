import { createSlice } from '@reduxjs/toolkit';
import { IDestination, ITask } from 'vl-shared/src/schemas/RoutesSchema';

import {
  deleteDestination,
  replaceDestinations,
  updateDestinations,
} from './actions/destination.action';
import { addTasks, replaceTasks, updateTasks } from './actions/task.action';

const routesReducer = createSlice({
  name: 'routes',
  initialState: {
    destinations: {} as Record<string, IDestination>,
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
      .addCase(replaceTasks, (state, action) => {
        const newTasks = action.payload;
        state.tasks = {};
        newTasks.forEach((task) => {
          state.tasks[task.id] = task;
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
      })
      .addCase(replaceDestinations, (state, action) => {
        const newDestinations = action.payload;
        state.destinations = {};
        newDestinations.forEach((destination) => {
          state.destinations[destination.id] = destination;
        });
      });
  },
});

export default routesReducer;
export const actions = routesReducer.actions;
