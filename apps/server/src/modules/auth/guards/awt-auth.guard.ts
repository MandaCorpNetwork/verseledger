import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractFromHeader(request);

    if (!token) throw new UnauthorizedException("Auth Token is Required");
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.AUTH_SECRET,
      });
      request.user = payload;
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
