import { Column, Entity } from "typeorm";
import { IsEnum, IsInt, Max, Min } from "class-validator";
import { EntityBase } from "#/entities/entitybase.entity";
import { IRatingType, RatingTypeSchema } from "#/entities/schemas/UserRating";

@Entity()
export class UserRating extends EntityBase {
  @Column({ length: 32 })
  @IsEnum(RatingTypeSchema)
  rating_type: IRatingType;

  @Column("int")
  @IsInt()
  @Min(1)
  @Max(5)
  rating_value: number;
}
