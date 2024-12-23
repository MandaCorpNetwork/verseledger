import { getAuthData } from '~encore/auth';
import { ApiPermission } from '../auth/auth';
import { APIError } from 'encore.dev/api';

export const checkPermission = (checkRole: ApiPermission) => {
  const auth = getAuthData();
  const parentRole = checkRole.includes('_') ? checkRole.split('_')[0] : null;
  if (auth == null) return false;
  for (const role of auth.roles) {
    if (role === ApiPermission.ADMIN) return true;
    if (role === checkRole) return true;
    if (parentRole && role === parentRole) return true;
  }
  return false;
};

export const assertPermission = (
  checkRole: ApiPermission,
  throwOnFalse = true
) => {
  const hasRole = checkPermission(checkRole);
  if (throwOnFalse && !hasRole)
    throw APIError.unauthenticated(`Missing Permission: ${checkRole}`);
  return hasRole;
};
