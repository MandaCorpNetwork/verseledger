import { z } from "zod";

export const FeedbackServiceSchema = z.enum([
  "Contracts",
  "Auth",
  "Pally",
  "User",
  "RSI",
  "Stomp",
  "Resource Editor",
]);

export type IFeedbackServices = z.infer<typeof FeedbackServiceSchema>;