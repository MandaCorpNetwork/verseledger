import { z } from 'zod';
import { ITimestamped, TimestampedSchema } from './TimestampedSchema';

export const ContractLocationSchema = z.object({
  constract_id: z.string(),
  location_id: z.string(),
});

export type IContractLocation = z.infer<typeof ContractLocationSchema>;

export const ContractLocationTimestampedSchema = z.union([
  ContractLocationSchema,
  TimestampedSchema,
]);

export type IContractLocationTimestamped = IContractLocation & ITimestamped; // To allow type mixing

export const LocationSchema = z.object({
  id: z.string().max(26),
  version: z.string().max(32),
  name: z.string().max(32),
  parent: z.string().max(32).nullable(),
  category: z.string().max(32),
  short_name: z.string().max(32),
  waypoint_name: z.string().max(32),
  time_index: z.string().max(32),
  x: z.number(),
  y: z.number(),
  z: z.number(),
  QT: z.boolean(),
  ContractLocation: ContractLocationSchema.optional(),
});

export type ILocation = z.infer<typeof LocationSchema>;

export const ContractTimestampedSchema = z.union([
  LocationSchema,
  TimestampedSchema,
]);

export type ILocationTimestamped = ILocation & ITimestamped; // To allow type mixing

export const LocationWithContractLocationSchema = LocationSchema.extend({
  ContractLocation: ContractLocationSchema,
});

export type ILocationWithContractLocation = z.infer<
  typeof LocationWithContractLocationSchema
>;

export const LocationWithContractLocationTimestampedSchema = z.union([
  LocationSchema.extend({
    ContractLocation: ContractLocationTimestampedSchema,
  }),
  TimestampedSchema,
]);

export type ILocationWithContractLocationTimestamped = z.infer<
  typeof LocationWithContractLocationTimestampedSchema
>;
