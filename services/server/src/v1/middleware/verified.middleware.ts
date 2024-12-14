import type { VLAuthPrincipal } from '@AuthProviders/VL.principal';
import { UnauthorizedError } from '@V1/errors/UnauthorizedError';
import { NotVerifiedError } from '@V1/errors/NotVerifiedError';
import { User } from '@V1/models/user/user.model';
import type { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';

export class VerifiedUserMiddleware extends BaseMiddleware {
  async handler(
    _req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    const user = this.httpContext.user as VLAuthPrincipal;
    user.isAuthenticated().then((authenticated) => {
      if (!authenticated) return next(new UnauthorizedError());
      User.findByPk(user.id, { attributes: ['verified'] }).then((user) => {
        if (user?.verified) return next();
        return next(new NotVerifiedError());
      });
    });
  }
}
