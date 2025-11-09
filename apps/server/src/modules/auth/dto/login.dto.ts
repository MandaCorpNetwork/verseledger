import { ApiProperty, ApiSchema } from "@nestjs/swagger";

@ApiSchema()
export class LoginDTO {
  @ApiProperty({
    description: "The authorization code received from the OAuth provider",
  })
  code: string;
}
