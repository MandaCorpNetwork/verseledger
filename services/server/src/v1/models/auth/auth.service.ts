import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { TYPES } from '@Constant/types';
import { EnvService } from '@V1/services/env.service';
import { Logger } from '@Utils/Logger';
import { AuthRepository } from './auth.repository';
import { ApiPermission } from 'vl-shared/src/enum/ApiPermission';
@injectable()
export class AuthService {
  constructor() {
    Logger.init();
  }
  @inject(TYPES.EnvService) declare private readonly _envars: EnvService;

  /**
   * Validate and Decode a token
   * @throws {Error} Invalid token
   */
  verifyToken(token: string) {
    return jwt.verify(token, Buffer.from(this._envars.AUTH_SECRET, 'base64'), {
      algorithms: ['HS512'],
    }) as {
      jti: string;
      id: string;
      exp: number;
      type: 'access' | 'refresh' | 'api';
      roles: ApiPermission[];
    };
  }

  async getUserToken(token: string) {
    let decoded!: string | jwt.JwtPayload;
    try {
      decoded = this.verifyToken(token);
    } catch (e) {
      Logger.error(e);
      return null;
    }
    const tokenDecoded = decoded as unknown;
    return tokenDecoded as ReturnType<typeof this.verifyToken>;
  }

  async invalidateToken(token: string, userId?: string) {
    let decoded;
    try {
      decoded = this.verifyToken(token);
    } catch (e) {
      Logger.error(e);
      return false;
    }
    const tokenDecoded = decoded;
    await AuthRepository.invalidateToken({
      user_id: userId ?? tokenDecoded.id,
      token_id: tokenDecoded.jti,
    });
    return true;
  }

  async signUser(user_id: string) {
    return AuthRepository.createTokenPair(user_id);
  }

  async createApiToken(
    user_id: string,
    expires?: Date | number | `${number}${'d' | 'h' | 's' | 'm' | 'y'}`,
    name?: string,
    roles?: ApiPermission[],
  ) {
    return AuthRepository.createApiToken(user_id, expires, 'api', name, roles);
  }

  async getApiTokens(user_id: string) {
    return AuthRepository.getTokens(user_id);
  }
}
