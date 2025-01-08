import { AuthData, getAuthData } from '~encore/auth';
import { APIError } from 'encore.dev/api';
import { invalidPermissionEvent } from './permissionFailureTopic';

export const checkPermission = (
  checkRole: ApiPermission,
  authData?: AuthData,
  publishOnFail: boolean = false,
) => {
  const auth = authData ?? getAuthData();
  const parentRole = checkRole.includes('_') ? checkRole.split('_')[0] : null;
  if (auth == null) return false;
  if (auth.type !== 'refresh') {
    for (const role of auth.roles) {
      if (role === ApiPermission.ADMIN) return true;
      if (role === checkRole) return true;
      if (parentRole && role === parentRole) return true;
    }
  }
  if (publishOnFail)
    invalidPermissionEvent.publish({
      permission: checkRole,
      token_id: auth.jti,
      user_id: auth.userID,
      time: new Date(Date.now()),
    });
  return false;
};

export const assertPermission = (
  checkRole: ApiPermission,
  authData?: AuthData,
  throwOnFalse = true,
  emitOnFalse = true,
) => {
  const hasRole = checkPermission(checkRole, authData, emitOnFalse);
  if (throwOnFalse && !hasRole) {
    throw APIError.unauthenticated(`Missing Permission: ${checkRole}`);
  }
  return hasRole;
};

export enum ApiPermission {
  ADMIN = 'ADMIN',
  VL_ADMIN = 'VLADMIN',
  CHAT = 'CHAT',
  CHAT_READ = 'CHAT_READ',
  CHAT_WRITE = 'CHAT_WRITE',
  NOTIFICATIONS = 'NOTIFICATIONS',
  NOTIFICATIONS_READ = 'NOTIFICATIONS_READ',
  NOTIFICATIONS_WRITE = 'NOTIFICATIONS_WRITE',
  CONTRACT = 'CONTRACT',
  CONTRACT_READ = 'CONTRACT_READ',
  CONTRACT_WRITE = 'CONTRACT_WRITE',
  BID = 'BID',
  BID_READ = 'BID_READ',
  BID_WRITE = 'BID_WRITE',
  RATING = 'RATING',
  RATING_READ = 'RATING_READ',
  RATING_WRITE = 'RATING_WRITE',
  USER = 'USER',
  USER_READ = 'USER_READ',
  USER_WRITE = 'USER_WRITE',
  USERSETTINGS = 'USERSETTINGS',
  USERSETTINGS_READ = 'USERSETTINGS_READ',
  USERSETTINGS_WRITE = 'USERSETTINGS_WRITE',
  ORGS = 'ORGS',
  ORGS_READ = 'ORGS_READ',
  ORGS_WRITE = 'ORGS_WRITE',
  TOKEN = 'TOKEN',
  TOKEN_READ = 'TOKEN_READ',
  TOKEN_WRITE = 'TOKEN_WRITE',
}
