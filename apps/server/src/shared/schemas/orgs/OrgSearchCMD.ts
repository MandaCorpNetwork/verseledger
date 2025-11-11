import { z } from "zod";

import { SearchSchema } from "../SearchSchema";

export const OrgSearchCMD = SearchSchema.extend({
  title: z.string().nullish(),
  rsi_handle: z.string().nullish(),
});
export type IOrgSearchCMD = z.infer<typeof OrgSearchCMD>;
