import { z } from "zod";

export const FeatureFlagSchema = z.object({
  id: z.string().max(26),
  name: z.string().max(32),
  description: z.string().max(128).default(""),
  enabled: z.boolean(),
  percentageOfUsers: z.number().gte(0).lte(100).nullish(),
  settingName: z.string().max(128).nullish(),
  settingValue: z.string().max(255).nullish(),
});

export type IFeatureFlag = z.infer<typeof FeatureFlagSchema>;
