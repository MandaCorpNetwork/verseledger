import type { User } from '@V1/models/user/user.model';
import type { interfaces } from 'inversify-express-utils';
import { ApiPermission } from 'vl-shared/src/enum/ApiPermission';

export class VLAuthPrincipal implements interfaces.Principal {
  public roles: Set<ApiPermission>;
  constructor(
    public id: string,
    public details: User,
    public type: 'api' | 'refresh' | 'access',
    roles: Array<ApiPermission> = [],
  ) {
    this.roles = new Set(this.type == 'api' ? roles : [ApiPermission.ADMIN]);
  }
  async isAuthenticated(): Promise<boolean> {
    return true;
  }
  async isInRole(role: ApiPermission): Promise<boolean> {
    return (
      this.roles.has(role) ||
      (role.includes('_') &&
        this.roles.has(role.split('_')[0] as ApiPermission))
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async isResourceOwner(_resourceId: any): Promise<boolean> {
    return true;
  }
}
