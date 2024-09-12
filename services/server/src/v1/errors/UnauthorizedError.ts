import { NetworkError } from './NetworkError';

export class UnauthorizedError extends NetworkError<
  'Unauthorized',
  Record<string, string>
> {
  constructor() {
    super(401, 'Unauthorized', {
      code: 'invalid_authorization',
      message: 'Bearer Token missing or Invalid permissions.',
    });
  }
}
