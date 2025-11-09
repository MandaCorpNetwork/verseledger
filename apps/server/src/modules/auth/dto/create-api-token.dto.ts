import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsString } from "class-validator";
import { ApiPermission } from "vl-shared/src/enum/ApiPermission";
export class CreateApiTokenDTO {
  @ApiProperty({
    description: "The name of the API token",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "The expiration date of the API token",
  })
  @Type(() => Date)
  @IsDate()
  expires: Date;

  @ApiProperty({
    description: "The permissions granted to the API token",
  })
  @IsEnum(ApiPermission, { each: true })
  roles: ApiPermission[];
}
