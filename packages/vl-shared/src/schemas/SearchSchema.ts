import { z } from "zod";
import { ContractStatusSchema } from "./ContractStatusSchema";
import { stringArray } from "../utils/stringArray";
import { ContractSubTypeSchema } from "./ContractSubTypeSchema";
import { ContractBidStatusSchema } from "./ContractBidStatusSchema";

export const SearchSchema = z.object({
  limit: z.coerce.number().optional(),
  page: z.coerce.number().optional(),
});

export type ISearch = z.infer<typeof SearchSchema>;

export const ContractSearchSchema = SearchSchema.extend({
  status: stringArray(ContractStatusSchema).optional(),
  subtype: stringArray(ContractSubTypeSchema).optional(),
  ownerId: stringArray(z.string()).optional(),
});

export const UserBidsSearchSchema = SearchSchema.extend({
  status: stringArray(ContractBidStatusSchema).optional(),
  contractId: stringArray(z.string()).optional(),
});
