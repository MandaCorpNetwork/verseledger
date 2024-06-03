/* eslint-disable @typescript-eslint/no-explicit-any */
import { NetworkError } from './NetworkError';

export class BadRequestError extends NetworkError<'BadRequest', any> {
  constructor(
    message: string = 'Bad Request',
    code: string = 'bad_request',
    path?: string,
  ) {
    super(400, 'BadRequest', {
      code,
      message,
      path,
    });
  }
}
