import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Location } from "./entities/location.entity";

@Injectable()
export class LocationService {
  private readonly Logger = new Logger(LocationService.name);
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

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

    const queryBuilder = this.locationRepository.createQueryBuilder("location");

    if (id)
      queryBuilder.andWhere("location.id IN (:...ids)", {
        ids: Array.isArray(id) ? id : [id],
      });

    if (parent)
      queryBuilder.andWhere("location.parent IN (:...parents)", {
        parents: Array.isArray(parent) ? parent : [parent],
      });

    if (category)
      queryBuilder.andWhere("location.category IN (:...categories)", {
        categories: Array.isArray(category) ? category : [category],
      });

    if (short_name)
      queryBuilder.andWhere("location.short_name IN (:...short_names)", {
        short_names: Array.isArray(short_name) ? short_name : [short_name],
      });

    if (waypoint_name)
      queryBuilder.andWhere("location.waypoint_name IN (:...waypoint_names)", {
        waypoint_names: Array.isArray(waypoint_name)
          ? waypoint_name
          : [waypoint_name],
      });

    const [locations, count] = await queryBuilder
      .take(Math.min(limit, 25))
      .skip(page * Math.min(limit, 25))
      .getManyAndCount();

    return { locations, count };
  }

  public async getLocationById(id: string) {
    return this.locationRepository.findOne({ where: { id } });
  }
}
