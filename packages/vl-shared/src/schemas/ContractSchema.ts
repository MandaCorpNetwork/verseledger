import { z } from "zod";
import { ITimestamped, TimestampedSchema } from "./TimestampedSchema";
import { ContractSubTypeSchema } from "./ContractSubTypeSchema";
import { ContractPayStructureSchema } from "./ContractPayStructureSchema";

export const ContractSchema = z.object({
  id: z.string().max(26),
  owner_id: z.string().max(26),
  title: z.string().max(32),
  subtype: ContractSubTypeSchema,
  briefing: z.string().max(2048),
  bidDate: z.coerce.date().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  isEmergency: z.boolean().default(false),
  locations: z.array(z.string()),
  ratingLimit: z.number().int().optional(),
  contractorLimit: z.number().int().positive().max(255),
  payStructure: ContractPayStructureSchema,
  isBargaining: z.boolean().default(false),
  isBonusPay: z.boolean().default(false),
  defaultPay: z.number().positive(),
  status: z.string(),
});

export type IContract = z.infer<typeof ContractSchema>;

export const ContractTimestampedSchema = z.union([
  ContractSchema,
  TimestampedSchema,
]);

export type IContractTimestamped = IContract & ITimestamped; // To allow type mixing

const CreateContractBodySchema = ContractSchema.omit({
  id: true,
  owner_id: true,
  status: true,
});
export type ICreateContractBody = z.infer<typeof CreateContractBodySchema>;
