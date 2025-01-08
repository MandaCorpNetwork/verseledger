import { ApiModel, ApiModelProperty } from 'swagger-express-ts';

import { DTOBase } from '@V1/DTO/DTOBase';
import { UserDTO } from '@V1/models/user/mapping/UserDTO';
import type { INotification } from 'vl-shared/src/schemas/NotificationSchema';

@ApiModel({
  description: 'Notification Object',
  name: 'Notification',
})
export class NotificationDTO
  extends DTOBase<INotification>
  implements INotification
{
  constructor($b: INotification) {
    super();
    this.mapProperties($b, {
      User: UserDTO,
    });
  }

  public readonly __type = 'Notification';
  public get __partial() {
    return false;
  }

  public toJSON() {
    return {
      ...this,
      action:
        typeof this.action === 'string' ? JSON.parse(this.action) : this.action,
      __partial: this.__partial,
    };
  }

  public strip() {
    return new NotificationDTO({
      ...this,
      User: undefined,
    });
  }

  @ApiModelProperty({
    description: 'ID of Notification',
    required: true,
    example: 'N-pu2lqjxks971z5ov62t9eg9p',
  })
  id!: string;

  @ApiModelProperty({
    description: 'Owner of Notification',
    required: true,
    example: 'U-pu2lqjxks971z5ov62t9eg9p',
  })
  user_id!: string;

  @ApiModelProperty({
    description: 'Has the notification been read',
    required: false,
    example: 'My Awesome Notification',
  })
  read!: boolean;

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
  action!: string | null;
}
