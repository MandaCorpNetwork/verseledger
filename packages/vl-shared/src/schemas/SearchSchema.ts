import { z } from 'zod';
import { ContractStatusSchema } from './ContractStatusSchema';
import { stringArray } from '../utils/stringArray';
import { ContractSubTypeSchema } from './ContractSubTypeSchema';
import { ContractBidStatusSchema } from './ContractBidStatusSchema';
import { ContractPayStructureSchema } from './ContractPayStructureSchema';

export const SearchSchema = z.object({
  limit: z.coerce.number().nonnegative().optional(),
  page: z.coerce.number().nonnegative().optional().default(0),
});

export type ISearch = z.infer<typeof SearchSchema>;

export const DateSearchSchema = z.object({
  before: z.date().optional(),
  after: z.date().optional(),
  exact: z.date().optional(),
});

export type IDateSearch = z.infer<typeof DateSearchSchema>;

export const ContractSearchSchema = SearchSchema.extend({
  status: stringArray(ContractStatusSchema).optional(),
  subtype: stringArray(ContractSubTypeSchema).optional(),
  ownerId: stringArray(z.string()).optional(),
  contractId: stringArray(z.string()).optional(),
  bidDate: DateSearchSchema.optional(),
  startDate: DateSearchSchema.optional(),
  endDate: DateSearchSchema.optional(),
  duration: z.coerce.number().optional(),
  contractorRatingLimit: z.coerce.number().optional(),
  payStructure: ContractPayStructureSchema.optional(),
  minPay: z.coerce.number().optional(),
  maxPay: z.coerce.number().optional(),
  isEmergency: z.string().optional(),
});

export type IContractSearch = z.infer<typeof ContractSearchSchema>;

export const UserBidsSearchSchema = SearchSchema.extend({
  status: stringArray(ContractBidStatusSchema).optional(),
  contractId: stringArray(z.string()).optional(),
  userId: stringArray(z.string()).optional(),
});

export type IUserBidSearch = z.infer<typeof UserBidsSearchSchema>;

export const LocationSearchSchema = SearchSchema.extend({
  id: stringArray(z.string()).optional(),
  parent: stringArray(z.string()).optional(),
  category: stringArray(z.string()).optional(),
  short_name: stringArray(z.string()).optional(),
  waypoint_name: stringArray(z.string()).optional(),
});

export type ILocationSearch = z.infer<typeof LocationSearchSchema>;