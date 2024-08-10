import { z } from "zod";

export const FeedbackConcernSchema = z.enum(["FrontEnd", "BackEnd", "Both"]);

export type IFeedbackConcern = z.infer<typeof FeedbackConcernSchema>;
