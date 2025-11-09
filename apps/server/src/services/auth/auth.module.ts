import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiToken } from "src/entities/auth/api_token.entity";
import { JwtAuthGuard } from "./guards/awt-auth.guard";
import { AuthService } from "./auth.service";
import { UserAuth } from "src/entities/auth/user_auth.entity";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.AUTH_SECRET,
      global: true,
      signOptions: {},
    }),
    TypeOrmModule.forFeature([ApiToken, UserAuth]),
  ],
  providers: [AuthService, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard, TypeOrmModule],
})
export class AuthModule {}
