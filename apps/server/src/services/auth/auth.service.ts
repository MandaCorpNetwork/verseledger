import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiToken } from "src/entities/auth/api_token.entity";
import { Repository } from "typeorm";
import { CreateApiTokenDTO } from "./dto/create-api-token.dto";
import { createId } from "@paralleldrive/cuid2";
import { Cron } from "@nestjs/schedule";

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
    await this.apiTokenRepository.delete(id);
    return { message: "API Token revokes successfully" };
  }

  @Cron("0 */30 * * * *", { name: "destroy_expired_tokens" })
  async revokeExpiredTokens() {
    this.logger.debug("Clearing expired tokens...");
    const now = Date.now();
    const cleared = await this.apiTokenRepository
      .createQueryBuilder("token")
      .where("token.expiresAt >= :now", { now })
      .execute();

    this.logger.debug(`Cleared ${cleared.length} tokens.`);
  }
}
