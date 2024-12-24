import { AuthData, getAuthData } from '~encore/auth';
import { ApiPermission } from './auth';
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
  for (const role of auth.roles) {
    if (role === ApiPermission.ADMIN) return true;
    if (role === checkRole) return true;
    if (parentRole && role === parentRole) return true;
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
