import { z } from "zod";

export const FeedbackTableSchema = z.enum([
  "Contracts",
  "Users",
  "Locations",
  "Notifications",
  "Organizations",
]);

export type IFeedbackTables = z.infer<typeof FeedbackTableSchema>;
