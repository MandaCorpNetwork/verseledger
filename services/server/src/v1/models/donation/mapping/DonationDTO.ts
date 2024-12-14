import { ApiModel, ApiModelProperty } from 'swagger-express-ts';

import { DTOBase } from '@V1/DTO/DTOBase';
import type { IDonation } from 'vl-shared/src/schemas/DonationSchema';

@ApiModel({
  description: 'Notification Object',
  name: 'Notification',
})
export class DonationDTO extends DTOBase<IDonation> implements IDonation {
  constructor($b: IDonation) {
    super();
    this.mapProperties($b);
  }

  public readonly __type = 'Donation';
  public get __partial() {
    return false;
  }

  public toJSON() {
    return {
      id: this.id,
      display_name: this.display_name,
      cents: this.cents,
      message: this.message,
      createdAt: this.createdAt,
    };
  }

  @ApiModelProperty({
    description: 'ID of Donation',
    required: true,
    example: 'N-pu2lqjxks971z5ov62t9eg9p',
  })
  id!: string;

  @ApiModelProperty({
    description: 'The display message',
    required: false,
    example: 'My Awesome Notification',
  })
  display_name!: string;

  @ApiModelProperty({
    description: 'The display message',
    required: false,
    example: 'My Awesome Notification',
  })
  message!: string;

  @ApiModelProperty({
    description: 'Action to fire if interacted',
    required: false,
    example: 'My Awesome Notification',
  })
  cents!: number;

  @ApiModelProperty({
    description: 'Action to fire if interacted',
    required: false,
    example: 'My Awesome Notification',
  })
  createdAt!: Date;
}
