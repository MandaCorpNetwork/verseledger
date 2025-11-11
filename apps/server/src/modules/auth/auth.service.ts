import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Cron } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { createId } from "@paralleldrive/cuid2";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import ms, { StringValue } from "ms";
import { Repository } from "typeorm";

import { ApiToken } from "#/entities/auth/api_token.entity";
import { ApiPermission } from "#/shared/schemas/ApiPermission";
import { ApiTokenType } from "#/shared/schemas/ApiTokenType";

import { InvaliTokenPropsError } from "./auth.error";
import { CreateApiTokenDTO } from "./dto/create-api-token.dto";
import { LoginType } from "./dto/login-method.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(ApiToken)
    private readonly apiTokenRepository: Repository<ApiToken>,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async createApiToken(
    user_id: string,
    expiresAt: Date | StringValue = "1h",
    type: ApiTokenType = ApiTokenType.ACCESS,
    name: string = "USER TOKEN",
    roles: ApiPermission[] = [ApiPermission.ADMIN],
    jwtid: string = createId(),
  ) {
    const tokenProps = plainToInstance(CreateApiTokenDTO, {
      expiresAt,
      name,
      roles,
    });
    const e = await validate(tokenProps);
    if (e.length > 0) {
      throw new InvaliTokenPropsError();
    }
    const token = await this.jwtService.signAsync(tokenProps.toJson(), {
      secret: this.configService.get<string>("app.auth_secret"),
      algorithm: "HS512",
      jwtid,
      audience: "verseledger.net",
      issuer: "api.verseledger.net",
      expiresIn: ms((tokenProps.expiresAt as Date).getTime() - Date.now()),
      subject: user_id,
    });
    const newToken = this.apiTokenRepository.create({
      id: jwtid,
      ...tokenProps,
    });
    newToken.user_id = user_id;
    newToken.type = type;
    await this.apiTokenRepository.save(newToken);
    return { token, meta: newToken };
  }

  async createTokenPair(user_id: string, jwtid: string = createId()) {
    const [access, refresh] = await Promise.all([
      this.createApiToken(
        user_id,
        "1h",
        ApiTokenType.ACCESS,
        undefined,
        [ApiPermission.ADMIN],
        jwtid,
      ),
      this.createApiToken(
        user_id,
        "2d",
        ApiTokenType.REFRESH,
        undefined,
        [ApiPermission.ADMIN],
        jwtid,
      ),
    ]);
    return { access, refresh };
  }

  async revokeAPiToken(id: string) {
    const token = await this.apiTokenRepository.findOne({ where: { id } });
    if (!token) throw new NotFoundException(`API Token "${id}" not found`);
    this.logger.debug(`Revoking token ${id}`);
    await this.apiTokenRepository.delete(id);
    return { message: "API Token revokes successfully" };
  }

  @Cron("0 */15 * * * *", { name: "destroy_expired_tokens" })
  async revokeExpiredTokens() {
    this.logger.debug("Clearing expired tokens...");
    const now = Date.now();
    const cleared = await this.apiTokenRepository
      .createQueryBuilder("token")
      .where("token.expiresAt >= :now", { now })
      .execute();

    this.logger.debug(`Revoked ${cleared.length} tokens.`);
  }

  public async getApiTokens(owner_id: string) {
    return await this.apiTokenRepository.find({ where: { user_id: owner_id } });
  }

  public getLoginMethods() {
    const loginCofig = this.configService.get("login");
    const loginMethods: Array<{ type: LoginType; redirect: string }> = [
      loginCofig.discord,
      loginCofig.google,
    ].filter((v) => v != null);
    return loginMethods;
  }

  public async loginWithDiscord(code: string) {
    const DISCORD_CLIENT_ID = this.configService.get<string>(
      "credentials.discord.id",
    );
    const DISCORD_CLIENT_SECRET = this.configService.get<string>(
      "credentials.discord.secret",
    );
    const FRONTEND_HOST = this.configService.get<string>("app.frontend_host");
    const body = new URLSearchParams({
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: `${FRONTEND_HOST}/oauth/discord/callback`,
      scope: "identify+openid",
    });
    const _user = await fetch("https://discord.com/api/v10/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body,
    })
      .then((res) => res.json())
      .then((body) => {
        const { token_type, access_token } = body as {
          access_token: string;
          token_type: string;
        };
        return fetch(`https://discord.com/api/v10/users/@me`, {
          headers: { Authorization: `${token_type} ${access_token}` },
        })
          .then((r) => r.json())
          .then((user) => {
            return user as { id: string; username: string; avatar: string };
          });
      });
    // const dbUser = await this.userService.findOrCreateUser(user.id, "DISCORD");
    // if (dbUser.newUser) {
    //   await this.notificationsService.createNotification(
    //     dbUser.user.getDataValue("id"),
    //     "@NOTIFICATION.MESSAGES.VERIFY_RSI",
    //     { type: "popup", popup: "$VERIFY" },
    //   );
    // } else {
    // await dbUser.user.set("last_login", new Date(Date.now()))?.save();
    // }
    // UserRepository.updateUserRating(dbUser.user.id);
    // return this.signUser(dbUser.user.id);
  }

  public async loginWithGoogle(code: string) {
    const GOOGLE_CLIENT_ID = this.configService.get<string>(
      "credentials.google.id",
    );
    const GOOGLE_CLIENT_SECRET = this.configService.get<string>(
      "credentials.google.secret",
    );
    const FRONTEND_HOST = this.configService.get<string>("app.frontend_host");
    const body = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: `${FRONTEND_HOST}/oauth/google/callback`,
      scope: "openid",
    });
    const _user = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body,
    })
      .then((res) => res.json())
      .then((body) => {
        const { token_type, access_token } = body as {
          access_token: string;
          token_type: string;
        };
        return fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
          headers: { Authorization: `${token_type} ${access_token}` },
        })
          .then((r) => r.json())
          .then((user) => {
            return {
              id: (user as { sub: string }).sub,
              avatar: (user as { picture: string }).picture,
            } as { id: string; avatar: string };
          });
      });
    // const dbUser = await this.userService.findOrCreateUser(user.id, 'GOOGLE');
    // if (dbUser.newUser) {
    //   await this.notificationsService.createNotification(
    //     dbUser.user.getDataValue('id'),
    //     '@NOTIFICATION.MESSAGES.VERIFY_RSI',
    //     { type: 'popup', popup: '$VERIFY' },
    //   );
    // } else {
    //   await dbUser.user.set('last_login', new Date(Date.now()))?.save();
    // }
    // UserRepository.updateUserRating(dbUser.user.id);
    // return this.authService.signUser(dbUser.user.id);
  }
}
