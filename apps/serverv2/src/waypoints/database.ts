import { SQLDatabase } from 'encore.dev/storage/sqldb';

export const WaypointDatabase = new SQLDatabase('waypoint-database', {
  migrations: './migrations',
});

//comment
