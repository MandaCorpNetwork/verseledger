import { z } from "zod";

export const OrganizationInviteStatusSchema = z.enum([
  "PENDING",
  "ACCEPTED",
  "REJECTED",
  "INVITED",
  "DECLINED",
  "EXPIRED",
  "DISMISSED",
  "WITHDRAWN",
]);
export type IOrganizationInviteStatus = z.infer<
  typeof OrganizationInviteStatusSchema
>;
