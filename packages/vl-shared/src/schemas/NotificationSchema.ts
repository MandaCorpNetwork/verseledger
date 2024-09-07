import { z } from "zod";

export const NotificationSchema = z.object({});

export type INotification = z.infer<typeof NotificationSchema>;
