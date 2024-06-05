import { z } from "zod";
export const ContractPayStructureSchema = z.enum([
  "FLATRATE",
  "POOL",
  "HOURLY",
]);

export enum ContractPayStructure {
  FLATRATE = "FLATRATE",
  POOL = "POOL",
  HOURLY = "HOURLY",
}

export type IContractPayStructure = z.infer<typeof ContractPayStructureSchema>;
