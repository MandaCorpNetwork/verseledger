import {
  BaseHttpController,
  controller,
  httpGet,
  next,
  queryParam,
  requestParam,
} from 'inversify-express-utils';
import { TYPES } from '@Constant/types';
import { inject } from 'inversify';
import { UserService } from '@V1/models/user/user.service';
import { AuthService } from '@V1/models/auth/auth.service';
import { ContractService } from '@V1/models/contract/contract.service';
import { IdPrefix, IdUtil } from '@/utils/IdUtil';
import { Location } from '@V1/models/location/location.model';
import { NotFoundError } from '@V1/errors/NotFoundError';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import { ApiOperationGet, ApiPath } from 'swagger-express-ts';
import { LocationSearchSchema } from 'vl-shared/src/schemas/SearchSchema';
import { NextFunction } from 'express';
import { Logger } from '@/utils/Logger';
import { BadRequestError } from '@V1/errors/BadRequest';
import { LocationService } from './locations.services';
import { PaginatedDataDTO } from '@V1/DTO';
import { ILocation } from 'vl-shared/src/schemas/LocationSchema';
import { LocationDTO } from './mapping/LocationDTO';
@ApiPath({
  path: '/v1/locations',
  name: 'Locations',
  security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
})
@controller('/v1/locations')
export class LocationController extends BaseHttpController {
  constructor(
    @inject(TYPES.UserService) private readonly userService: UserService,
    @inject(TYPES.AuthService) private readonly authService: AuthService,
    @inject(TYPES.ContractService)
    private readonly contractService: ContractService,
    @inject(TYPES.LocationService) private readonly locationService: LocationService,
  ) {
    super();
  }

  @ApiOperationGet({
    summary: 'Search for Locations',
    description: 'Pass search parameters to find an array of locations',
    path: '/search',
    responses: {
      200: {
        type: 'Success',
        description: 'Found',
        model: 'Unknown',
      },
    },
    consumes: [],
    parameters: {
      query: {
        'search[id]': {
          required: false,
          description: 'List of Ids',
          type: 'string',
        },
        'search[category]': {
          required: false,
          description: 'List of Categories',
          type: 'string',
        },
        'search[parent]': {
          required: false,
          description: 'List of Parent Locations',
          type: 'string',
        },
        'search[short_name]': {
          required: false,
          description: 'List of Short Names',
          type: 'string',
        },
        'search[waypoint_name]': {
          required: false,
          description: 'List of Waypoint Names',
          type: 'string',
        },
        'search[limit]': {
          required: false,
          description: 'Limit number of results',
          minimum: 0,
          default: 25,
          type: 'number',
        },
      },
    },
    security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: []},
  })
  @httpGet('/search', TYPES.VerifiedUserMiddleware)
  private async searchLocations(
    @next() nextFunc: NextFunction,
    @queryParam('search') searchRaw?: unknown,
  ) {
    let search: ReturnType<(typeof LocationSearchSchema)['parse']>;
    try {
      search = LocationSearchSchema.strict().optional().parse(searchRaw)!;
    } catch (error) {
      Logger.error(error);
      throw new BadRequestError('Incorrect Request Body', '400');
    }
    const locationSearch = await this.locationService.search(search!);
    const locations = locationSearch.rows;

    const response = new PaginatedDataDTO(
      locations as ILocation[],
      {
        total: locationSearch.count,
        limit: Math.min(25, search?.limit ?? 25),
        page: search?.page ?? 0,
      },
      LocationDTO,
    );
    return this.ok(response);
  }
    
  @ApiOperationGet({
    description: 'Get a Location',
    summary: 'Get a Location',
    path: '/{locationId}',
    responses: {
      200: {
        type: 'Success',
        description: 'Found',
        model: 'Unknown',
      },
    },
    consumes: [],
    parameters: {
      path: {
        locationId: {
          required: true,
          description: 'A Location ID',
          type: 'string',
        },
      },
    },
    security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
  })
  @httpGet(
    `/:id(${IdUtil.expressRegex(IdPrefix.Location)})`,
    TYPES.VerifiedUserMiddleware,
  )
  public async getLocation(@requestParam('id') id: string) {
    const location = await Location.findByPk(id);
    if (location == null) return new NotFoundError(id);
    return location;
  }

  @ApiOperationGet({
    description: 'Get all Location',
    summary: 'Get all Location',
    path: '/',
    responses: {
      200: {
        type: 'Success',
        description: 'Found',
        model: 'Unknown',
      },
    },
    consumes: [],
    parameters: {
      path: {
        locationId: {
          required: true,
          description: 'A Location ID',
          type: 'string',
        },
      },
    },
    security: { VLBearerAuth: [], VLQueryAuth: [], VLTokenAuth: [] },
  })
  @httpGet('/', TYPES.VerifiedUserMiddleware)
  public async getLocations() {
    return Location.findAll();
  }
  @httpGet('/generateData')
  public async generateLocationData() {
    const dataRaw = fs.readFileSync('./locationData/locations.csv');
    const data = parse(dataRaw.toString()) as [
      id: string,
      outpost_index: string,
      time_index: string,
      waypoint_name: string,
      short_name: string,
      x: string,
      y: string,
      z: string,
      string,
      string,
      string,
      string,
      qt: 'TRUE' | 'FALSE',
    ][];
    let version = 'UNKNOWN';
    let category = 'Planet';
    const entries = [];
    for (const entry of data) {
      if (entry[1].trim() == 'Earth') continue;
      if (entry[1] === 'Outpost Index') {
        version = entry[0];
        continue;
      }
      if (entry[4] == '') {
        category = entry[3] == '' ? 'Uncategorized' : entry[3];
        continue;
      }
      entries.push({
        version,
        name: entry[0],
        category,
        parent: category == 'Planet' ? null : entry[0].split(' ')[0],
        short_name: entry[4] != '' ? entry[4] : null,
        waypoint_name: entry[3] != '' ? entry[3] : null,
        time_index: entry[2] != '' ? entry[2] : null,
        x: Number(entry[5]),
        y: Number(entry[6]),
        z: Number(entry[7]),
        QT: entry[12] == 'TRUE',
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Location.bulkCreate(entries as any);
    return entries;
    //return data;
  }
}
