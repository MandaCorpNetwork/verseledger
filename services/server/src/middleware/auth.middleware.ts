import { VLAuthPrincipal } from '@/authProviders/VL.principal';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';

export class AuthMiddleware extends BaseMiddleware {
  async handler(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const user = this.httpContext.user as VLAuthPrincipal;
    if (!(await user.isAuthenticated())) {
      return next(new UnauthorizedError());
    }
    next();
  }
}
