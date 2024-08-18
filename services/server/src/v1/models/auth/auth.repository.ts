import { injectable } from 'inversify';
import { InvalidToken } from './invalid_tokens.model';

@injectable()
export class AuthRepository {
  private static InvalidToken = InvalidToken;
  public static async createInvalidToken(token: {
    user_id: string;
    token_id: string;
    expires: Date;
  }) {
    return AuthRepository.InvalidToken.create(token);
  }
}
