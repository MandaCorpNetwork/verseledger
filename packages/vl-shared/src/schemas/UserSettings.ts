import { z } from "zod";

export const UserSettingsSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  soundPack: z.string().max(32),
  theme: z.string().max(32),
  userPageImage: z.string().max(32),
  animations: z.string().max(32),
  quality: z.string().max(32),
});

export type IUserSettings = z.infer<typeof UserSettingsSchema>;
