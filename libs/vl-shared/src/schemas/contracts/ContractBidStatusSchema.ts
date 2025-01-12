import { z } from 'zod';

export const ContractBidStatusSchema = z.enum([
  'PENDING',
  'ACCEPTED',
  'REJECTED',
  'INVITED',
  'DECLINED',
  'EXPIRED',
  'DISMISSED',
  'WITHDRAWN',
]);
export type IContractBidStatus = z.infer<typeof ContractBidStatusSchema>;
