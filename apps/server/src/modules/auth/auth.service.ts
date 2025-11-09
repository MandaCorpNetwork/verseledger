import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Cron } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { createId } from "@paralleldrive/cuid2";
import { Repository } from "typeorm";

import { ApiToken } from "#/entities/auth/api_token.entity";

import { CreateApiTokenDTO } from "./dto/create-api-token.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(ApiToken)
    private readonly apiTokenRepository: Repository<ApiToken>,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async createApiToken(tokenProps: CreateApiTokenDTO) {
    const tokenId = createId();
    return this.apiTokenRepository.create({
      id: tokenId,
      ...tokenProps,
    });
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
    const loginMethods: Array<{ type: string; redirect: string }> = [];
    // TODO: Implement login methods retrieval logic

    return loginMethods;
  }
}
