import { z } from 'zod';

export const OrgSearchCMD = z.object({
  limit: z.number().max(25).min(0).nullish(),
  page: z.number().min(0).nullish(),
  title: z.string().nullish(),
  rsi_handle: z.string().nullish(),
});
export type IOrgSearchCMD = z.infer<typeof OrgSearchCMD>;
