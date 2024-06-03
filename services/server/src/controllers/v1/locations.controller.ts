import {
  BaseHttpController,
  controller,
  httpGet,
  requestParam,
} from 'inversify-express-utils';
import { TYPES } from '@Constant/types';
import { inject } from 'inversify';
import { UserService } from '@Services/user.service';
import { AuthService } from '@Services/auth.service';
import { ContractService } from '@Services/contracts.service';
import { IdPrefix, IdUtil } from '@/utils/IdUtil';
import { Location } from '@Models/location.model';
import { NotFoundError } from '@Errors/NotFoundError';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
@controller('/v1/locations')
export class LocationController extends BaseHttpController {
  constructor(
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.AuthService) private authService: AuthService,
    @inject(TYPES.ContractService) private contractService: ContractService,
  ) {
    super();
  }

  @httpGet(
    `/:id(${IdUtil.expressRegex(IdPrefix.Location)})`,
    TYPES.VerifiedUserMiddleware,
  )
  public async getLocation(@requestParam('id') id: string) {
    const location = await Location.findByPk(id);
    if (location == null) return new NotFoundError(id);
    return location;
  }
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
    Location.bulkCreate(entries);
    return entries;
    //return data;
  }
}
