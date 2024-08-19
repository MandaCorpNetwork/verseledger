import { NetworkError } from './NetworkError';

export class UnauthorizedError extends NetworkError<
  'Unauthorized',
  Record<string, string>
> {
  constructor() {
    super(401, 'Unauthorized', {
      code: 'missing_authorization',
      message: 'Bearer Token missing or invalid.',
    });
  }
}
