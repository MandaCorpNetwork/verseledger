import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { TYPES } from '@Constant/types';
import { EnvService } from '@V1/services/env.service';
import { Logger } from '@/utils/Logger';
import { AuthRepository } from './auth.repository';
@injectable()
export class AuthService {
  constructor() {
    Logger.init();
  }
  @inject(TYPES.EnvService) private declare readonly _envars: EnvService;

  async getUserToken(token: string) {
    let decoded!: string | jwt.JwtPayload;
    try {
      //TODO: CHANGE THIS SECRET
      decoded = jwt.verify(
        token,
        Buffer.from(this._envars.AUTH_SECRET, 'base64'),
        {
          algorithms: ['HS512'],
        },
      );
    } catch (e) {
      Logger.error(e);
      return null;
    }
    const tokenDecoded = decoded as unknown as {
      jti: string;
      id: string;
      exp: number;
      type: 'access' | 'refresh' | 'api';
    };
    return tokenDecoded;
  }
  async invalidateToken(token: string) {
    let decoded!: string | jwt.JwtPayload;
    try {
      decoded = jwt.verify(
        token,
        Buffer.from(this._envars.AUTH_SECRET, 'base64'),
        {
          algorithms: ['HS512'],
        },
      );
    } catch (e) {
      Logger.error(e);
      return null;
    }
    const tokenDecoded = decoded as unknown as {
      jti: string;
      id: string;
      exp: number;
    };
    await AuthRepository.invalidateToken({
      user_id: tokenDecoded.id,
      token_id: tokenDecoded.jti,
    });
    return true;
  }

  async signUser(user_id: string) {
    return AuthRepository.createTokenPair(user_id);
  }
}
