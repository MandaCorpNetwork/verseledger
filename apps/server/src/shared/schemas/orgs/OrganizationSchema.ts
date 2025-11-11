import { z } from "zod";

import { UserSchema } from "../UserSchema";

export const OrganizationSchema = z.object({
  id: z.string().max(26),
  title: z.string().max(50).min(1),
  owner_id: z.string().max(26),
  rsi_handle: z.string().max(32).min(1),
});

export type IOrganization = z.infer<typeof OrganizationSchema>;

export const createOrganizationCMD = OrganizationSchema.omit({
  owner_id: true,
  id: true,
});
export type ICreateOrganizationCMD = z.infer<typeof createOrganizationCMD>;

export const OrganizationMemberSchema = z.object({
  id: z.string().max(26),
  user_id: z.string().max(26),
  org_id: z.string().max(26),
  rank_id: z.string().max(26),
  joined: z.coerce.date(),
  primary: z.boolean(),
});
export type IOrganizationMember = z.infer<typeof OrganizationMemberSchema>;

export const OrganizationMemberWithUserSchema = OrganizationMemberSchema.extend(
  {
    User: UserSchema.optional(),
  },
);

export type IOrganizationMemberWithUser = z.infer<
  typeof OrganizationMemberWithUserSchema
>;

export const OrganizationRankSchema = z.object({
  id: z.string().max(26),
  org_id: z.string().max(26),
  rank_name: z.string().max(32),
});
export type IOrganizationRank = z.infer<typeof OrganizationRankSchema>;

export const OrganizationMemberWithOrgSchema = OrganizationMemberSchema.extend({
  Org: OrganizationSchema.optional(),
  Rank: OrganizationRankSchema.optional(),
});

export type IOrganizationMemberWithOrg = z.infer<
  typeof OrganizationMemberWithOrgSchema
>;

export const OrganizationWithMembersSchema = OrganizationSchema.extend({
  Members: z.array(OrganizationMemberWithUserSchema).optional(),
  Ranks: z.array(OrganizationRankSchema).optional(),
});

export type IOrganizationWithMembers = z.infer<
  typeof OrganizationWithMembersSchema
>;
