import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { DTOBase } from './DTOBase';
import {
  IRatingType,
  IUserRating,
} from 'vl-shared/src/schemas/UserRatingsSchema';

@ApiModel({
  description: 'Rating Object',
  name: 'Rating',
})
export class RatingDTO extends DTOBase<IUserRating> implements IUserRating {
  constructor($b: IUserRating) {
    super();
    this.mapProperties($b);
  }

  __type = 'Rating';

  public toJSON() {
    return {
      ...this,
    };
  }

  public strip() {
    return new RatingDTO({} as IUserRating);
  }

  @ApiModelProperty({
    description: 'ID of Rating',
    required: true,
    example: 'R-pu2lqjxks971z5ov62t9eg9p',
  })
  id!: string;

  @ApiModelProperty({
    description: 'ID of Submitter',
    required: true,
    example: 'U-pu2lqjxks971z5ov62t9eg9p',
  })
  submitter_id!: string;

  @ApiModelProperty({
    description: 'ID of Reciever',
    required: true,
    example: 'U-pu2lqjxks971z5ov62t9eg9p',
  })
  reciever_id!: string;

  @ApiModelProperty({
    description: 'ID of Contract',
    required: true,
    example: 'C-pu2lqjxks971z5ov62t9eg9p',
  })
  contract_id!: string;

  @ApiModelProperty({
    description: 'Type of Rating',
    required: true,
    example: 'Manage',
  })
  rating_type!: IRatingType;

  @ApiModelProperty({
    description: 'Rating Value',
    required: true,
    example: 1,
  })
  rating_value!: number;

  @ApiModelProperty({
    description: 'Comment',
    required: true,
    example: 'This is a comment',
  })
  comment!: string;
}
