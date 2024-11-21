import { SearchSchema } from '../SearchSchema';
import { z } from 'zod';

export const OrgSearchCMD = SearchSchema.extend({
  title: z.string().nullish(),
  rsi_handle: z.string().nullish(),
});
export type IOrgSearchCMD = z.infer<typeof OrgSearchCMD>;
