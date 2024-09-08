import { z } from 'zod';

export const ApiTokenCreateSchema = z.object({
  name: z.string().max(32).optional(),
  expires: z.union([z.string().pipe(z.coerce.date()).optional(), z.string()]),
});
export type IApiTokenCreate = z.infer<typeof ApiTokenCreateSchema>;
