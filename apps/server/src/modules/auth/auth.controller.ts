import {
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  UseGuards,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
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

  @Get("/login_methods")
  public async getLoginMethods() {
    return this.authService.getLoginMethods();
  }
}
