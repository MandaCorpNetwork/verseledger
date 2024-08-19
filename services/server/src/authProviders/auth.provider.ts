import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { inject, injectable } from 'inversify';
import { interfaces } from 'inversify-express-utils';
import { ParsedQs } from 'qs';
import { TYPES } from '@Constant/types';
import { AuthService } from '@V1/models/auth/auth.service';
import { AnonymousPrincipal } from './anonymous.principal';
import { VLAuthPrincipal } from './VL.principal';
import { User } from '@V1/models/user/user.model';
import { ApiToken } from '@V1/models/auth/api_token.model';
import { Op } from 'sequelize';
import { Logger } from '@/utils/Logger';

@injectable()
export class AuthProvider implements interfaces.AuthProvider {
  @inject(TYPES.AuthService) private declare readonly _authService: AuthService;

  async getUser(
    req: Request<
      ParamsDictionary,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      ParsedQs,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Record<string, any>
    > /*, res: Response<any, Record<string, any>>, next: NextFunction*/,
  ): Promise<interfaces.Principal> {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader == null) return new AnonymousPrincipal(false);

    const token = bearerHeader.split(' ')[1];
    if (token == null) return new AnonymousPrincipal(false);

    const user = await this._authService.getUserToken(token);
    if (user == null) return new AnonymousPrincipal(false);

    const valid = await ApiToken.findOne({
      where: {
        user_id: user.id,
        token_id: user.jti,
        type: user.type,
        expiresAt: { [Op.gte]: Date.now() },
      },
    });
    Logger.info(valid)
    if (valid == null) return new AnonymousPrincipal(false);

    const principal = new VLAuthPrincipal(
      user.id,
      (await User.findOne({
        where: { id: user.id },
      })) as User,
    );
    return principal;
  }
}
