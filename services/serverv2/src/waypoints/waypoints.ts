import { api } from 'encore.dev/api';
import { WaypointDatabase } from './database';

export const listPublic = api(
  {
    method: 'GET',
    expose: true,
    path: '/waypoints/public',
  },
  async () => {
    const waypoints_raw = WaypointDatabase.query`SELECT * FROM waypoints WHERE public = 't'`;
    const waypoints = await Array.fromAsync(waypoints_raw);
    return waypoints;
  },
);
