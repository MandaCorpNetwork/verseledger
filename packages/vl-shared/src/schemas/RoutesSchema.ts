import { z } from 'zod';
import { LocationSchema } from './LocationSchema';
import { UserSchema } from './UserSchema';

export const TaskStatusSchema = z.enum(['PENDING', 'ENROUTE', 'COMPLETED', 'INTERUPTED']);

export type ITaskStatus = z.infer<typeof TaskStatusSchema>;

export const TaskTypeSchema = z.enum([
  'pickup',
  'dropoff',
  'refuel',
  'repair',
  'rearm',
  'crew',
  'food',
  'medical',
  'checkpoint',
  'other',
]);

export type ITaskType = z.infer<typeof TaskTypeSchema>;

export const TaskSchema = z.object({
  id: z.string(),
  relationId: z.string().optional(),
  label: z.string().optional(),
  type: TaskTypeSchema,
  missionLabel: z.string().optional(),
  missionId: z.string().optional(),
  location: LocationSchema,
  status: TaskStatusSchema,
  item: z.string().optional(),
  user: UserSchema.optional(),
  scu: z.number().optional(),
});

export type ITask = z.infer<typeof TaskSchema>;

export const DestinationSchema = z.object({
  id: z.string(),
  stopNumber: z.number(),
  visited: z.boolean(),
  tasks: z.array(TaskSchema),
  location: LocationSchema,
});

export type IDestination = z.infer<typeof DestinationSchema>;
