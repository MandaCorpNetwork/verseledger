import { ContractSchema } from 'vl-shared/src/schemas/contracts/ContractSchema';
import { ContractTimestampedSchema } from 'vl-shared/src/schemas/LocationSchema';
import { ZodSchema } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const schemaMap: Record<string, ZodSchema<any>> = {
  ContractTimestamped: ContractTimestampedSchema,
  Contract: ContractSchema,
};
