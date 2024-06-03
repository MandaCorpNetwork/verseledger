import { z } from 'zod';

export const CreateContractValidator = z.object({
  title: z.string().max(32),
  subtype: z.string().max(32),
  briefing: z.string().max(2048),
  bidDate: z.coerce.date().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  isEmergency: z.boolean().default(false),
  ratingLimit: z.number().int().optional(),
  contractorLimit: z.number().int().positive().max(255),
  payStructure: z.string().max(32),
  isBargaining: z.boolean().default(false),
  isBonusPay: z.boolean().default(false),
  defaultPay: z.number().positive(),
});
