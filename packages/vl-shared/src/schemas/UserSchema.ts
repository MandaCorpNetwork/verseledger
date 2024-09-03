import { z } from "zod";
import { IUserSettings } from "./UserSettings";

export const UserSchema = z.object({
  id: z.string(),
  handle: z.string(),
  displayName: z.string(),
  pfp: z.string(),
  verified: z.boolean(),
});

export type IUser = z.infer<typeof UserSchema>;

export type IUserWithSettings = IUser & {
  Settings?: Partial<IUserSettings>;
};
