import { ApiSchema } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

@ApiSchema()
export class UserSettingsDTO {
  @IsString()
  @IsOptional()
  soundPack: string;

  @IsString()
  @IsOptional()
  theme: string;

  @IsString()
  @IsOptional()
  userPageImage: string;

  @IsString()
  @IsOptional()
  animations: string;

  @IsString()
  @IsOptional()
  quality: string;

  @IsString()
  @IsOptional()
  dataDisplay: string;
}
