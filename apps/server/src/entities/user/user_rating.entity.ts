import { Column, Entity } from "typeorm";
import { Min, Max, IsInt, IsEnum } from "class-validator";
import { EntityBase } from "../entitybase.entity";
import { IRatingType, RatingTypeSchema } from "../schemas/UserRating";

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
