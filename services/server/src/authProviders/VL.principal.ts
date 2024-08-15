import { User } from '@V1/models/user/user.model';
import { interfaces } from 'inversify-express-utils';

export class VLAuthPrincipal implements interfaces.Principal {
  constructor(
    public id: string,
    public details: User,
  ) {}
  async isAuthenticated(): Promise<boolean> {
    return true;
  }
  async isInRole(role: string): Promise<boolean> {
    return role == role;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async isResourceOwner(resourceId: any): Promise<boolean> {
    return resourceId == resourceId;
  }
}
