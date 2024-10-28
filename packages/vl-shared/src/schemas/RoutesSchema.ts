import { z } from 'zod';
import { LocationSchema } from './LocationSchema';
import { ContractSchema } from './ContractSchema';
import { UserSchema } from './UserSchema';

export const TaskStatusSchema = z.enum(['PENDING', 'ENROUTE', 'COMPLETED', 'INTERUPTED']);

export type ITaskStatus = z.infer<typeof TaskStatusSchema>;

export const TaskTypeSchema = z.enum(['pickup', 'delievery', 'stop']);

export type ITaskType = z.infer<typeof TaskTypeSchema>;

export const TaskSchema = z.object({
  id: z.string(),
  type: z.string(),
  label: z.string().optional(),
  location: LocationSchema,
  status: TaskStatusSchema,
});

export type ITask = z.infer<typeof TaskSchema>;

export const LogisticTransportSchema = z.object({
  id: z.string(),
  label: z.string(),
  pickup: TaskSchema,
  dropoff: TaskSchema,
  manifest: z.string(),
  scu: z.number(),
  status: TaskStatusSchema,
  contract: ContractSchema.optional(),
});

export type ILogisticTransport = z.infer<typeof LogisticTransportSchema>;

export const UserTransportSchema = z.object({
  id: z.string(),
  label: z.string(),
  pickup: TaskSchema,
  dropoff: TaskSchema,
  users: z.array(UserSchema),
  status: TaskStatusSchema,
  contract: ContractSchema.optional(),
});

export type IUserTransport = z.infer<typeof UserTransportSchema>;

export const BaseMissionSchema = z.object({
  id: z.string(),
  label: z.string(),
});

export type IBaseMission = z.infer<typeof BaseMissionSchema>;

export const MissionSchema = BaseMissionSchema.extend({
  objectives: z.array(z.union([LogisticTransportSchema, UserTransportSchema])),
});

export type IMission = z.infer<typeof MissionSchema>;

export const DestinationSchema = z.object({
  id: z.string(),
  stopNumber: z.number(),
  visited: z.boolean(),
  reason: z.string(),
  objectives: z.array(TaskSchema),
  location: LocationSchema,
});

export type IDestination = z.infer<typeof DestinationSchema>;
