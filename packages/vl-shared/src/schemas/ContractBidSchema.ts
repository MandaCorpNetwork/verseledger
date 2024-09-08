import { z } from 'zod';
import { ITimestamped, TimestampedSchema } from './TimestampedSchema';
import { UserSchema } from './UserSchema';
import { ContractBidStatusSchema } from './ContractBidStatusSchema';

export const ContractBidSchema = z.object({
  id: z.string().max(26),
  contract_id: z.string().max(26),
  user_id: z.string().max(26),
  status: ContractBidStatusSchema,
  amount: z.number().int().nonnegative(),
  User: UserSchema.optional(),
});

export type IContractBid = z.infer<typeof ContractBidSchema>;

export const ContractBidTimestampedSchema = z.union([
  ContractBidSchema,
  TimestampedSchema,
]);

export type ILocationTimestamped = IContractBid & ITimestamped; // To allow type mixing
