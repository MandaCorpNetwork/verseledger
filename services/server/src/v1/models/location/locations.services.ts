import { Logger } from '@/utils/Logger';
import { optionalSet, queryIn } from '@/utils/Sequelize/queryIn';
import { injectable } from 'inversify';
import { Location } from './location.model';

@injectable()
export class LocationService {
  constructor() {
    Logger.init();
  }

  public async search(params: {
    id?: string | string[];
    parent?: string | string[];
    category?: string | string[];
    short_name?: string | string[];
    waypoint_name?: string | string[];
    limit?: number;
    page?: number;
  }) {
    const {
      id,
      parent,
      category,
      short_name,
      waypoint_name,
      limit = 25,
      page = 0,
    } = params ?? {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query = {} as any;
    optionalSet(query, 'id', queryIn(id));
    optionalSet(query, 'parent', queryIn(parent));
    optionalSet(query, 'category', queryIn(category));
    optionalSet(query, 'short_name', queryIn(short_name));
    optionalSet(query, 'waypoint_name', queryIn(waypoint_name));

    const locations = await Location.findAndCountAll({
      where: query,
      limit: Math.min(limit, 25),
      offset: page * Math.min(limit, 25),
    });

    const count = await Location.count({ where: query });

    return { ...locations, count };
  }
}
