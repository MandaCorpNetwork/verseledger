import { z } from "zod";

export const FeedbackToolSchema = z.enum([
  "Contract Browser",
  "Filters",
  "Contract Display",
  "Radio Stations",
  "Notifications",
  "Location Explorer",
  "Contract Manager",
  "Player Card",
  "Nav Buttons",
  "Contract Bids",
  "Create Contract",
  "Feedback",
  "Other",
]);

export type IFeedbackTools = z.infer<typeof FeedbackToolSchema>;
