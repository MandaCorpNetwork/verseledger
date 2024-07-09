import { z } from "zod";

export const ContractBidStatusSchema = z.enum([
  "PENDING",
  "ACCEPTED",
  "REJECTED",
  "INVITED",
  "DECLINED",
]);
export type IContractBidStatus = z.infer<typeof ContractBidStatusSchema>;
