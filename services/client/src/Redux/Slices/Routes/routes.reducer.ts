import { createSlice } from '@reduxjs/toolkit';
import { IDestination, ITask } from 'vl-shared/src/schemas/RoutesSchema';

import {
  nextStop,
  startRoute,
  updateActiveTask,
  updateLoad,
} from './actions/activeRoute.action';
import {
  deleteDestination,
  replaceDestinations,
  updateDestinations,
} from './actions/destination.action';
import { addTasks, replaceTasks, updateTasks } from './actions/task.action';
import { destinationsAdapter, tasksAdapter } from './routes.adapters';

const initialState = {
  destinations: destinationsAdapter.getInitialState(),
  tasks: tasksAdapter.getInitialState(),
  activeRoute: { stop: {} as IDestination, active: false, currentLoad: 0 },
};

const routesReducer = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    noop() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(startRoute, (state, action) => {
        const currentDestination = action.payload.destination;
        const scuLoad = action.payload.scuLoad;
        state.activeRoute.active = true;
        state.activeRoute.currentLoad = state.activeRoute.currentLoad + scuLoad;
        state.activeRoute.stop = currentDestination;
      })
      .addCase(nextStop, (state, action) => {
        const nextDestination = action.payload.nextDestination;
        state.activeRoute.stop = nextDestination;
        const updatedDestination = action.payload.updatedDestination;
        destinationsAdapter.upsertOne(state.destinations, updatedDestination);
      })
      .addCase(updateLoad, (state, action) => {
        const newLoad = action.payload;
        state.activeRoute.currentLoad = newLoad;
      })
      .addCase(updateActiveTask, (state, action) => {
        const updatedTask = action.payload.task;
        const updatedDestination = action.payload.destination;
        tasksAdapter.upsertOne(state.tasks, updatedTask);
        destinationsAdapter.upsertOne(state.destinations, updatedDestination);
        state.activeRoute.stop = updatedDestination;
      })
      .addCase(addTasks, (state, action) => {
        const taskArray = action.payload;
        tasksAdapter.addMany(state.tasks, taskArray);
      })
      .addCase(updateTasks, (state, action) => {
        const updatedTasks = action.payload;
        tasksAdapter.upsertMany(state.tasks, updatedTasks);
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
