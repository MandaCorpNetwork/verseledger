import { ContractSchema } from 'vl-shared/src/schemas/contracts/ContractSchema';
import { ContractTimestampedSchema } from 'vl-shared/src/schemas/LocationSchema';
import { z } from 'zod';

export const schemaMap: Record<string, z.ZodSchema<unknown>> = {
  ContractTimestamped: ContractTimestampedSchema,
  Contract: ContractSchema,
};
