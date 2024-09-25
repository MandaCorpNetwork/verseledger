import { z } from 'zod';
import { LocationSchema } from './LocationSchema';
import { ContractSchema } from './ContractSchema';

export const ObjectiveSchema = z.object({
  packageId: z.number(),
  pickup: LocationSchema,
  dropOff: LocationSchema,
  contents: z.string(),
  scu: z.number().nullable(),
});

export type IObjective = z.infer<typeof ObjectiveSchema>;

export const MissionSchema = z.object({
  missionId: z.number(),
  objectives: z.array(ObjectiveSchema),
});

export type IMission = z.infer<typeof MissionSchema>;

export const DestinationSchema = z.object({
  stopNumber: z.number(),
  location: LocationSchema,
  reason: z.string(),
  objectives: z.array(ObjectiveSchema).optional(),
  contract: ContractSchema,
});

export type IDestination = z.infer<typeof DestinationSchema>;
