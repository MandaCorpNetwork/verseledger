import { UnauthorizedError } from '@V1/errors/UnauthorizedError';
import type { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';

export class TestingMiddleware extends BaseMiddleware {
  async handler(
    _req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
      return next(new UnauthorizedError());
    }
    next();
  }
}
