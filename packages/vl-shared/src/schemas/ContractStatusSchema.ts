import { z } from "zod";

export const ContractStatusSchema = z.enum([
  "BIDDING",
  "INPROGRESS",
  "COMPLETED",
  "CANCELED",
]);

export type IContractStatus = z.infer<typeof ContractStatusSchema>;
