import { User } from '@V1/models/user/user.model';
import { interfaces } from 'inversify-express-utils';
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
    return this.roles.has(ApiPermission.ADMIN) || this.roles.has(role);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async isResourceOwner(resourceId: any): Promise<boolean> {
    return resourceId == resourceId;
  }
}
