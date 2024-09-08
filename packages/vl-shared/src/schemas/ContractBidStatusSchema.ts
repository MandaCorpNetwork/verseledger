import { z } from 'zod';

export const ContractBidStatusSchema = z.enum([
  'PENDING',
  'ACCEPTED',
  'REJECTED',
  'INVITED',
  'DECLINED',
  'EXPIRED',
]);
export type IContractBidStatus = z.infer<typeof ContractBidStatusSchema>;
