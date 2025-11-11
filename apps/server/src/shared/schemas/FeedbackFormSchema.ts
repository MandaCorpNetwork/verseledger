import { z } from "zod";

import { FeedbackBrowserSchema } from "./FeedbackBrowserSchema";
import { FeedbackConcernSchema } from "./FeedbackConcernSchema";
import { FeedbackFeatureSchema } from "./FeedbackFeatureSchema";
import { FeedbackServiceSchema } from "./FeedbackServiceSchema";
import { FeedbackTableSchema } from "./FeedbackTableSchema";
import { FeedbackToolSchema } from "./FeedbackToolSchema";

export const FeedbackNeeds = z.object({
  short: z.string().max(32),
  long: z.string(),
});

export type IFeedbackNeeds = z.infer<typeof FeedbackNeeds>;

export const BaseFeedbackSchema = z.object({
  username: z.string().describe("Contributor Name"),
  userTitle: z.string().max(32).describe("User Title"),
  brief: z.string().max(300),
  createdAt: z.coerce.date(),
});

export type IBaseFeedback = z.infer<typeof BaseFeedbackSchema>;

export const BugFeedbackSchema = BaseFeedbackSchema.extend({
  type: z.literal("BUG"),
  feature: FeedbackFeatureSchema,
  tool: FeedbackToolSchema,
  browser: FeedbackBrowserSchema,
  observedBehavior: z.string().describe("Observed Behavior"),
  expectedBehavior: z.string().optional().describe("Expected Behavior"),
  suggestedBehavior: z.string().optional().describe("Suggested Behavior"),
  logs: z.string().optional().nullable().describe("Logs"),
  attachment: z.string().url().optional().describe("URL to attachment"),
  notes: z.string().optional(),
});

export type IBugFeedback = z.infer<typeof BugFeedbackSchema>;

export const SuggestionFeebackSchema = BaseFeedbackSchema.extend({
  type: z.literal("SUGGESTION"),
  feature: FeedbackFeatureSchema,
  tool: FeedbackToolSchema.optional(),
  suggestedBehavior: z.string().describe("Suggested Behavior"),
  attachments: z.string().url().optional().describe("URL to attachment"),
  public: z.boolean().default(true),
  notes: z.string().optional(),
});

export type ISuggestionFeedback = z.infer<typeof SuggestionFeebackSchema>;

export const QuestionFeedbackSchema = BaseFeedbackSchema.extend({
  type: z.literal("QUESTION"),
  feature: FeedbackFeatureSchema,
  tool: FeedbackToolSchema.optional(),
  question: z.string(),
  attachment: z.string().url().optional().describe("URL to attachment"),
  public: z.boolean().default(true),
  notes: z.string().optional(),
});

export type IQuestionFeedback = z.infer<typeof QuestionFeedbackSchema>;

export const UserIssueFeedbackSchema = BaseFeedbackSchema.extend({
  type: z.literal("USER_ISSUE"),
  feature: FeedbackFeatureSchema.optional(),
  tool: FeedbackToolSchema.optional(),
  report: z.string(),
  attachments: z.string().url().optional().describe("URL to attachment"),
  notes: z.string().optional(),
});

export type IUserIssueFeedback = z.infer<typeof UserIssueFeedbackSchema>;

export const FeatureQueFeedbackSchema = BaseFeedbackSchema.extend({
  type: z.literal("UPDATE"),
  feature: FeedbackFeatureSchema.optional(),
  newFeature: z.string().max(26).optional(),
  concern: FeedbackConcernSchema,
  tool: FeedbackToolSchema.optional(),
  newTool: z.string().max(26).optional(),
  table: FeedbackTableSchema.optional(),
  newTable: z.string().max(26).optional(),
  service: FeedbackServiceSchema.optional(),
  newService: z.string().max(26).optional(),
  currentBehavior: z.string().optional().describe("Current Behavior"),
  intendedBehavior: z.string().describe("Intended Behavior"),
  frontNeeds: z.array(FeedbackNeeds).optional(),
  backNeeds: z.array(FeedbackNeeds).optional(),
  attachments: z.string().url().optional().describe("URL to attachment"),
  notes: z.string().optional(),
  linkedMilestone: z.string().optional(),
});

export type IFeatureQueFeedback = z.infer<typeof FeatureQueFeedbackSchema>;

export const MilestoneFeedbackSchema = BaseFeedbackSchema.extend({
  type: z.literal("MILESTONE"),
  purpose: z.string(),
  feature: FeedbackFeatureSchema.optional(),
  concern: FeedbackConcernSchema,
  tool: FeedbackToolSchema.optional(),
  newTool: z.string().max(26).optional(),
  table: FeedbackTableSchema.optional(),
  newTable: z.string().max(26).optional(),
  service: FeedbackServiceSchema.optional(),
  newService: z.string().max(26).optional(),
  currentBehavior: z.string().optional().describe("Current Behavior"),
  frontNeeds: z.array(FeedbackNeeds).optional(),
  backNeeds: z.array(FeedbackNeeds).optional(),
  functionality: z.string(),
  attachments: z.string().url().optional().describe("URL to attachment"),
  milestone: z.string().optional(),
});

export type IMilestoneFeedback = z.infer<typeof MilestoneFeedbackSchema>;

export const FeedbackFormSchema = z.union([
  BugFeedbackSchema,
  SuggestionFeebackSchema,
  QuestionFeedbackSchema,
  UserIssueFeedbackSchema,
  FeatureQueFeedbackSchema,
  MilestoneFeedbackSchema,
]);

export type IFeedbackForm = z.infer<typeof FeedbackFormSchema>;
