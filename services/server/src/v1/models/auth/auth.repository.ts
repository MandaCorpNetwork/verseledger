import { injectable } from 'inversify';
import { ApiToken } from './api_token.model';
import { IdUtil } from '@/utils/IdUtil';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import { EnvService } from '@V1/services/env.service';
import { Op } from 'sequelize';

const env = new EnvService();
@injectable()
export class AuthRepository {
  private static ApiToken = ApiToken;
  public static async invalidateToken(token: {
    user_id: string;
    token_id: string;
  }) {
    await AuthRepository.ApiToken.destroy({
      where: { user_id: token.user_id, token_id: token.token_id },
    });
    return true;
  }
  public static async createApiToken(
    user_id: string,
    expires: Date | number | `${number}${'d' | 'h' | 's' | 'm' | 'y'}` = '1h',
    type = 'access',
    name = 'USER TOKEN',
    jwtid: string = IdUtil.generateSystemID(),
  ) {
    const expiresRange =
      typeof expires === 'string' ? ms(expires) : new Date(expires).getTime();
    const expiresAt = Date.now() + expiresRange;
    const token = jwt.sign(
      { id: user_id, type },
      Buffer.from(env.AUTH_SECRET, 'base64'),
      {
        algorithm: 'HS512',
        jwtid,
        audience: 'verseledger.space',
        issuer: 'api.verseledger.space',
        expiresIn: '1h',
        subject: user_id,
      },
    );
    const newToken = await AuthRepository.ApiToken.create({
      user_id,
      name,
      type,
      token_id: jwtid,
      expiresAt,
    });
    return { ...newToken.toJSON(), token };
  }
  public static async createTokenPair(
    user_id: string,
    jwtid: string = IdUtil.generateSystemID(),
  ) {
    const [accessToken, refreshToken] = await Promise.all([
      AuthRepository.createApiToken(user_id, '1h', 'access', undefined, jwtid),
      AuthRepository.createApiToken(user_id, '2d', 'refresh', undefined, jwtid),
    ]);
    return { accessToken, refreshToken };
  }

  public static async getTokens(user: string, type: string = 'api') {
    return ApiToken.findAll({
      where: { user_id: user, type, expiresAt: { [Op.gte]: Date.now() } },
    });
  }
}
