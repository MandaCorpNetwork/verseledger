import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Post,
  ServiceUnavailableException,
  UseGuards,
} from "@nestjs/common";
import { ApiServiceUnavailableResponse } from "@nestjs/swagger";

import { MissingLoginMethod } from "./auth.error";
import { AuthService } from "./auth.service";
import { LoginMethodDTO, LoginType } from "./dto/login-method.dto";
import { LoginDTO } from "./dto/login.dto";
import { JwtAuthGuard } from "./guards/awt-auth.guard";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private readonly logger = new Logger(AuthController.name);

  @UseGuards(JwtAuthGuard)
  @Get("/tokens")
  public async getUserTokens() {
    return this.authService.getApiTokens("");
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/tokens/:token_id")
  public async revokeToken(@Param("token_id") token_id: string) {
    this.authService.revokeAPiToken(token_id);
  }

  @ApiServiceUnavailableResponse({
    description:
      "Unable to retrieve login methods at this time, or none have been configured",
  })
  @Get("/login_methods")
  public async getLoginMethods(): Promise<LoginMethodDTO[]> {
    const loginMethods = this.authService.getLoginMethods();
    if (loginMethods.length === 0) throw new ServiceUnavailableException();
    return loginMethods;
  }

  @Post("/login/:service")
  public async loginWithOAuth(
    @Body() body: LoginDTO,
    @Param("service") service: LoginType,
  ) {
    switch (service) {
      case LoginType.DISCORD: {
        try {
          return await this.authService.loginWithDiscord(body.code);
        } catch (error) {
          if (error instanceof MissingLoginMethod)
            throw new ServiceUnavailableException(
              `Unable to retrieve Discord login information at this time`,
            );
        }
        break;
      }
      case LoginType.GOOGLE: {
        try {
          return await this.authService.loginWithGoogle(body.code);
        } catch (error) {
          if (error instanceof MissingLoginMethod)
            throw new ServiceUnavailableException(
              `Unable to retrieve Google login information at this time`,
            );
        }
        break;
      }
      default:
        throw new BadRequestException("Invalid service");
    }
    throw new InternalServerErrorException();
  }
}
