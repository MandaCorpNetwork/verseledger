import { z } from "zod";

export const NotificationSchema = z.object({
  id: z.string().max(26),
  user_id: z.string().max(26),
  read: z.boolean(),
  message: z.string(),
  action: z.string().max(255).nullish(),
});

export const NotificationActionSchema = z.object({
  type: z.enum(["popup", "link"]),
  popup: z.string().nullish(),
  link: z.string().nullish(),
  arguments: z.array(z.any()).nullish(),
});

export type INotification = z.infer<typeof NotificationSchema>;
export type INotificationAction = z.infer<typeof NotificationActionSchema>;
