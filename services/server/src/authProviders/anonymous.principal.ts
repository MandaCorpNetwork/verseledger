import type { interfaces } from 'inversify-express-utils';

export class AnonymousPrincipal implements interfaces.Principal {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(details: any) {
    this.details = details;
  }
  async isAuthenticated(): Promise<boolean> {
    return false;
  }
  async isInRole(role: string): Promise<boolean> {
    return role == 'anonymous';
  }
  async isResourceOwner(resourceId: unknown): Promise<boolean> {
    return resourceId == 'anonymous';
  }
}
