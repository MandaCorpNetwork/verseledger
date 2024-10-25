import { z } from 'zod';
import { LocationSchema } from './LocationSchema';
import { ContractSchema } from './ContractSchema';
import { UserSchema } from './UserSchema';

export const ObjectiveStatusSchema = z.enum([
  'PENDING',
  'ENROUTE',
  'COMPLETED',
  'INTERUPTED',
]);

export type IObjectiveStatus = z.infer<typeof ObjectiveStatusSchema>;

export const ObjectiveTypeSchema = z.enum(['pickup', 'delievery', 'stop']);

export type IObjectiveType = z.infer<typeof ObjectiveTypeSchema>;

export const ObjectiveSchema = z.object({
  id: z.string(),
  type: z.string(),
  label: z.string().optional(),
  location: LocationSchema,
  status: ObjectiveStatusSchema,
});

export type IObjective = z.infer<typeof ObjectiveSchema>;

export const LogisticTransportSchema = z.object({
  id: z.string(),
  label: z.string(),
  pickup: ObjectiveSchema,
  dropoff: ObjectiveSchema,
  manifest: z.string(),
  scu: z.number(),
  status: ObjectiveStatusSchema,
  contract: ContractSchema.optional(),
});

export type ILogisticTransport = z.infer<typeof LogisticTransportSchema>;

export const UserTransportSchema = z.object({
  id: z.string(),
  label: z.string(),
  pickup: ObjectiveSchema,
  dropoff: ObjectiveSchema,
  users: z.array(UserSchema),
  status: ObjectiveStatusSchema,
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
  objectives: z.array(ObjectiveSchema),
  location: LocationSchema,
});

export type IDestination = z.infer<typeof DestinationSchema>;
