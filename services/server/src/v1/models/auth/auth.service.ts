import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { TYPES } from '@Constant/types';
import { EnvService } from '@V1/services/env.service';
import { IdUtil } from '@/utils/IdUtil';
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
    };
    return tokenDecoded;
  }
  async invalidateToken(token: string) {
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
    };
    const response = await AuthRepository.createInvalidToken({
      user_id: tokenDecoded.id,
      token_id: tokenDecoded.jti,
      expires: new Date(tokenDecoded.exp * 1000),
    });
    return response != null;
  }

  async signUser(user: string) {
    const jwtid = IdUtil.generateSystemID();
    return {
      accessToken: jwt.sign(
        { id: user },
        Buffer.from(this._envars.AUTH_SECRET, 'base64'),
        {
          algorithm: 'HS512',
          jwtid,
          audience: 'verseledger.space',
          issuer: 'api.verseledger.space',
          expiresIn: '1h',
          subject: String(user),
        },
      ),
      refreshToken: jwt.sign(
        { id: user, refresh: true },
        Buffer.from(this._envars.AUTH_SECRET, 'base64'),
        {
          algorithm: 'HS512',
          jwtid,
          audience: 'verseledger.space',
          issuer: 'api.verseledger.space',
          expiresIn: '2d',
          subject: String(user),
        },
      ),
    };
  }
}
