import { z } from 'zod';
import { type ITimestamped, TimestampedSchema } from '../TimestampedSchema';
import { ContractSubTypeSchema } from './ContractSubTypeSchema';
import { ContractPayStructureSchema } from './ContractPayStructureSchema';
import { LocationSchema } from '../LocationSchema';
import { UserSchema } from '../UserSchema';
import { ContractBidSchema } from './ContractBidSchema';
import { UserRatingSchema } from '../UserRatingsSchema';

export const ContractSchema = z.object({
  id: z.string().max(26).describe('CUID2'),
  owner_id: z.string().max(26).describe('CUID2'),
  title: z.string().max(32).describe('Contract Title'),
  subtype: ContractSubTypeSchema,
  briefing: z.string().max(2048),
  bidDate: z.coerce.date().optional().nullable(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  isEmergency: z.boolean().default(false),
  ratingLimit: z.number().int().optional(),
  contractorLimit: z.number().int().positive().max(255),
  payStructure: ContractPayStructureSchema,
  isBargaining: z.boolean().default(false),
  isBonusPay: z.boolean().default(false),
  defaultPay: z.number().int().nonnegative(),
  status: z.string(),
  Locations: z.array(LocationSchema).optional(),
  Bids: z.array(ContractBidSchema).optional(),
  Ratings: z.array(UserRatingSchema).optional(),
});

export type IContract = z.infer<typeof ContractSchema>;

export const ContractWithOwnerSchema = ContractSchema.extend({
  Owner: UserSchema,
});

export type IContractWithOwner = z.infer<typeof ContractWithOwnerSchema>;

export const ContractTimestampedSchema = z.union([ContractSchema, TimestampedSchema]);

export type IContractTimestamped = IContract & ITimestamped; // To allow type mixing

export const CreateContractBodySchema = ContractSchema.omit({
  id: true,
  owner_id: true,
  Locations: true,
}).extend({
  Locations: z.array(z.object({ location: z.string(), tag: z.string() })).optional(),
});
export type ICreateContractBody = z.infer<typeof CreateContractBodySchema>;

export const UpdateContractSchema = ContractSchema.omit({
  id: true,
  owner_id: true,
  Bids: true,
  Locations: true,
});
