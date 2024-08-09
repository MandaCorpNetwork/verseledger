import { z } from "zod";

export const FeedbackBrowserSchema = z.enum([
  "CHROME",
  "FIREFOX",
  "SAFARI",
  "EDGE",
  "OPERA",
]);

export type IBrowser = z.infer<typeof FeedbackBrowserSchema>;
