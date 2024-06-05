import { z } from "zod";
export const TimestampedSchema = z.object({
  updatedAt: z.date(),
  createdAt: z.date(),
});

export type ITimestamped = z.infer<typeof TimestampedSchema>;
