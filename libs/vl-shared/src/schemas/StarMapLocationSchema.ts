import { z } from 'zod';

export const StarMapLocationSchema = z.object({
  id: z.string(),
  name: z.string(),
  parent: z.string().nullable(),
  category: z.string(),
  short_name: z.string(),
  waypoint_name: z.string(),
  x: z.number(),
  y: z.number(),
  z: z.number(),
  QT: z.boolean(),
});

export type IStarMapLocation = z.infer<typeof StarMapLocationSchema>;
