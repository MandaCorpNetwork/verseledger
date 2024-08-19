import { ApiModel, ApiModelProperty } from 'swagger-express-ts';

import { ILocation } from 'vl-shared/src/schemas/LocationSchema';

import { DTOBase } from '@V1/DTO/DTOBase';

@ApiModel({
  description: 'Location Object',
  name: 'Location',
})
export class LocationDTO extends DTOBase<ILocation> implements ILocation {
  constructor($b: ILocation) {
    super();
    this.mapProperties($b);
  }

  __type = 'Location';

  @ApiModelProperty({
    description: 'Name of Location',
    required: true,
    example: 'Ita 06',
  })
  name!: string;

  @ApiModelProperty({
    description: 'ID of Location',
    required: true,
    example: 'L-pu2lqjxks971z5ov62t9eg9p',
  })
  id!: string;

  @ApiModelProperty({
    description: 'Game Version',
    required: true,
    example: '3.23.0-LIVE 9171682',
  })
  version!: string;

  @ApiModelProperty({
    description: 'Parent Body',
    required: false,
    example: 'Stanton',
  })
  parent!: string | null;

  @ApiModelProperty({
    description: 'Category',
    required: true,
    example: 'Caves',
  })
  category!: string;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 'TODO',
  })
  short_name!: string;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 'TODO',
  })
  waypoint_name!: string;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 'TODO',
  })
  time_index!: string;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 'TODO',
  })
  x!: number;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 'TODO',
  })
  y!: number;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 'TODO',
  })
  z!: number;

  @ApiModelProperty({
    description: 'TODO',
    required: true,
    example: 'TODO',
  })
  QT!: boolean;
}
