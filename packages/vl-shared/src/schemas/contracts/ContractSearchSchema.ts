import { DateSearchSchema, SearchSchema } from '../SearchSchema';
import { stringArray } from '../../utils/stringArray';
import { z } from 'zod';
import { ContractBidStatusSchema } from './ContractBidStatusSchema';
import { ContractPayStructureSchema } from './ContractPayStructureSchema';
import { ContractStatusSchema } from './ContractStatusSchema';
import { ContractSubTypeSchema } from './ContractSubTypeSchema';

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
