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
    const bearerHeader: string | undefined = req.headers['authorization'];
    const api_key: string | undefined =
      (req.headers['x-api-key'] as string) ?? (req.query.api_key as string);
    if (bearerHeader == null && api_key == null)
      return new AnonymousPrincipal(false);

    let user: Awaited<ReturnType<AuthService['getUserToken']>>;

    if (bearerHeader != null) {
      // Bearer Token
      const [type, token] = bearerHeader?.split?.(' ') ?? [null, null];
      if (type != 'Bearer' && type != 'Bot')
        return new AnonymousPrincipal(false);

      if (token == null) return new AnonymousPrincipal(false);

      user = await this._authService.getUserToken(token);
      if (type == 'Bot' && user?.type != 'api')
        return new AnonymousPrincipal(false);
    } else {
      // Api Token
      user = await this._authService.getUserToken(api_key);
      if (user?.type !== 'api') return new AnonymousPrincipal(false);
    }

    if (user == null) return new AnonymousPrincipal(false);

    const valid = await ApiToken.findOne({
      where: {
        user_id: user.id,
        token_id: user.jti,
        type: user.type,
        expiresAt: { [Op.gte]: Date.now() },
      },
    });
    if (valid == null) return new AnonymousPrincipal(false);

    const principal = new VLAuthPrincipal(
      user.id,
      (await User.findOne({
        where: { id: user.id },
      })) as User,
      user.type,
    );
    return principal;
  }
}
