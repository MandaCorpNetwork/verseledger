import { ApiPermission } from '../enum/ApiPermission';
import { z } from 'zod';

export const ApiTokenCreateSchema = z.object({
  name: z.string().max(32).optional(),
  expires: z.union([z.string().pipe(z.coerce.date()).optional(), z.string()]),
  roles: z.array(
    z.enum([
      ApiPermission.CHAT,
      ApiPermission.CHAT_READ,
      ApiPermission.CHAT_WRITE,
      ApiPermission.NOTIFICATIONS,
      ApiPermission.NOTIFICATIONS_READ,
      ApiPermission.NOTIFICATIONS_WRITE,
      ApiPermission.CONTRACT,
      ApiPermission.CONTRACT_READ,
      ApiPermission.CONTRACT_WRITE,
      ApiPermission.BID,
      ApiPermission.BID_READ,
      ApiPermission.BID_WRITE,
      ApiPermission.RATING,
      ApiPermission.RATING_READ,
      ApiPermission.RATING_WRITE,
      ApiPermission.USER,
      ApiPermission.USER_READ,
      ApiPermission.USER_WRITE,
      ApiPermission.USERSETTINGS,
      ApiPermission.USERSETTINGS_READ,
      ApiPermission.USERSETTINGS_WRITE,
      ApiPermission.TOKEN,
      ApiPermission.TOKEN_READ,
      ApiPermission.TOKEN_WRITE,
    ]),
  ),
});
export type IApiTokenCreate = z.infer<typeof ApiTokenCreateSchema>;
