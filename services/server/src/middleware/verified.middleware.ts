import { VLAuthPrincipal } from '@/authProviders/VL.principal';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { NotVerifiedError } from '@Errors/NotVerifiedError';
import { User } from '@Models/user.model';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';

export class VerifiedUserMiddleware extends BaseMiddleware {
  async handler(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const user = this.httpContext.user as VLAuthPrincipal;
    if (!(await user.isAuthenticated())) {
      return next(new UnauthorizedError());
    }
    const isVerified =
      (await User.findByPk(user.id, { attributes: ['verified'] }))?.verified ??
      false;
    if (!isVerified) return next(new NotVerifiedError());
    next();
  }
}
