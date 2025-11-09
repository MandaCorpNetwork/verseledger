import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ApiToken } from "#/entities/auth/api_token.entity";
import { UserAuth } from "#/entities/auth/user_auth.entity";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/awt-auth.guard";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.AUTH_SECRET,
      global: true,
      signOptions: {},
    }),
    TypeOrmModule.forFeature([ApiToken, UserAuth]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard, TypeOrmModule],
})
export class AuthModule {}
