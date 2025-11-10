import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsEnum, IsString } from "class-validator";
import { StringValue } from "ms";

import { ApiPermission } from "#/entities/schemas/ApiPermission";
import { transformStringOrDurattionToDate } from "#/utils/transformStringOrDurationToDate";

@ApiSchema()
export class CreateApiTokenDTO {
  @ApiProperty({
    description: "The name of the API token",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "The expiration date of the API token",
  })
  @Transform(transformStringOrDurattionToDate)
  @Type(() => Date)
  @IsDate()
  expiresAt: Date | StringValue;

  @ApiProperty({
    description: "The permissions granted to the API token",
  })
  @IsEnum(ApiPermission, { each: true })
  roles: ApiPermission[];

  toJson() {
    return {
      name: this.name,
      expiresAt: this.expiresAt as Date,
      roles: this.roles,
    };
  }
}
