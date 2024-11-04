import { createAction } from '@reduxjs/toolkit';
import { ITask } from 'vl-shared/src/schemas/RoutesSchema';

export const updateTasks = createAction<ITask[]>('routes/updateTasks');

export const addTasks = createAction<ITask[]>('routes/addTasks');

export const replaceTasks = createAction<ITask[]>('routes/replaceTasks');
