import { NetworkError } from './NetworkError';

export class NotVerifiedError extends NetworkError<
  'Not Verified',
  Record<string, string>
> {
  constructor() {
    super(401, 'Not Verified', {
      code: 'missing_verification',
      message: 'You account is not Verified.',
    });
  }
}
