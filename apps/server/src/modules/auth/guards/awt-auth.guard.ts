import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { Repository } from "typeorm";

import { ApiToken } from "#/modules/auth/entities/api_token.entity";

import type { VLToken } from "#/modules/auth/vl-token";

export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(ApiToken)
    private readonly apiTokenRepository: Repository<ApiToken>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractFromHeader(request);

    if (!token) throw new UnauthorizedException("Auth Token is Required");
    try {
      const payload = await this.jwtService.verifyAsync<VLToken>(token, {
        secret: process.env.AUTH_SECRET,
      });

      const apiToken = await this.apiTokenRepository.findOneBy({
        id: payload.jti,
      });
      if (!apiToken) throw new UnauthorizedException("Token is Invalid");
      request.token = apiToken;
    } catch (_error) {
      throw new UnauthorizedException("Token is Invalid");
    }

    return true;
  }

  private extractFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(" ");
    return type === "Bearer" ? token : undefined;
  }
}
