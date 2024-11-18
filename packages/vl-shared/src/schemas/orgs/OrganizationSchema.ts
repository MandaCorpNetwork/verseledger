import { z } from 'zod';

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
  role: z.string().max(32),
  joined: z.coerce.date(),
});
export type IOrganizationMember = z.infer<typeof OrganizationMemberSchema>;
