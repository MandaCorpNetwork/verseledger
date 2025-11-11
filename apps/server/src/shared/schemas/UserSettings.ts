import { z } from "zod";

export const UserSettingsSchema = z.object({
  soundPack: z.string().max(32),
  theme: z.string().max(32),
  userPageImage: z.string().max(32),
  animations: z.string().max(32),
  quality: z.string().max(32),
  dataDisplay: z.string().max(1),
});

export const UpdateUserSettingsCMD = z
  .object({
    soundPack: z.string().max(32).nullable(),
    theme: z.string().max(32).nullable(),
    userPageImage: z.string().max(32).nullable(),
    animations: z.string().max(32).nullable(),
    quality: z.string().max(32).nullable(),
    dataDisplay: z.string().max(1).nullable(),
  })
  .partial();

export const UpdateUserSettingsFlagsCMD = z.record(
  z.string().startsWith("feature_"),
  z.string().nullable(),
);
export type IUpdateUserSettingsFlagsCMD = z.infer<
  typeof UpdateUserSettingsFlagsCMD
>;
export type IUpdateUserSettingsCMD = z.infer<typeof UpdateUserSettingsCMD>;

export type IUserSettings = z.infer<typeof UserSettingsSchema>;
