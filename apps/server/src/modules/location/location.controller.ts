import { Controller, Get, Query, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/awt-auth.guard";

import { LocationService } from "./location.service";

@Controller("locations")
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @UseGuards(JwtAuthGuard)
  @Get("/search")
  public async searchLocations(
    @Query("id") id?: string | string[],
    @Query("parent") parent?: string | string[],
    @Query("category") category?: string | string[],
    @Query("short_name") short_name?: string | string[],
    @Query("waypoint_name") waypoint_name?: string | string[],
    @Query("limit") limit?: number,
    @Query("page") page?: number,
  ) {
    return this.locationService.search({
      id,
      parent,
      category,
      short_name,
      waypoint_name,
      limit,
      page,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get("/:id")
  public async getLocationById(id: string) {
    const location = this.locationService.getLocationById(id);
    return location;
  }
}
