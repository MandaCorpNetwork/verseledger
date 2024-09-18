import { VLAuthPrincipal } from '@/authProviders/VL.principal';
import { UnauthorizedError } from '@V1/errors/UnauthorizedError';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';

export class AuthMiddleware extends BaseMiddleware {
  async handler(
    _req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    const user = this.httpContext.user as VLAuthPrincipal;
    user.isAuthenticated().then((authenticated) => {
      if (authenticated) return next();
      return next(new UnauthorizedError());
    });
  }
}
