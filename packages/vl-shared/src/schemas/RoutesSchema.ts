import { z } from 'zod';
import { LocationSchema } from './LocationSchema';
import { ContractSchema } from './ContractSchema';

export const ObjectiveStatusSchema = z.enum([
  'PENDING',
  'OBTAINED',
  'COMPLETED',
  'INTERUPTED',
]);

export type IObjectiveStatus = z.infer<typeof ObjectiveStatusSchema>;

export const ObjectiveSchema = z.object({
  packageId: z.number(),
  pickup: LocationSchema,
  dropOff: LocationSchema,
  contents: z.string(),
  scu: z.number().nullable(),
  status: ObjectiveStatusSchema,
});

export type IObjective = z.infer<typeof ObjectiveSchema>;

export const MissionSchema = z.object({
  missionId: z.number(),
  objectives: z.array(ObjectiveSchema),
});

export type IMission = z.infer<typeof MissionSchema>;

export const DestinationSchema = z.object({
  id: z.string(),
  stopNumber: z.number(),
  location: LocationSchema,
  reason: z.string(),
  objectives: z.array(ObjectiveSchema).optional(),
  contract: ContractSchema.optional(),
});

export type IDestination = z.infer<typeof DestinationSchema>;

export const GroupedDestinationsSchema = z.object({
  parent: LocationSchema,
  destinations: z.array(DestinationSchema),
});

export type IGroupedDestinations = z.infer<typeof GroupedDestinationsSchema>;

export const GroupedLocationSchema = z.object({
  parent: LocationSchema,
  location: LocationSchema,
});

export type IGroupedLocation = z.infer<typeof GroupedLocationSchema>;
