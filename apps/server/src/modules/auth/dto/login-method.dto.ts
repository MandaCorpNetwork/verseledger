import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsEnum, IsUrl } from "class-validator";

export enum LoginType {
  DISCORD = "discord",
  GOOGLE = "google",
}

@ApiSchema()
export class LoginMethodDTO {
  @ApiProperty()
  @IsEnum(LoginType)
  type: LoginType;

  @ApiProperty()
  @IsUrl()
  redirect: string;
}
