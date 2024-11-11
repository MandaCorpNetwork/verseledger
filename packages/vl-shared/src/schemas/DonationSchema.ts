import { z } from 'zod';

export const DonationSchema = z.object({
  id: z.string(),
  display_name: z.string(),
  cents: z.number().int(),
  message: z.string().nullish(),
});

export type IDonation = z.infer<typeof DonationSchema>;
