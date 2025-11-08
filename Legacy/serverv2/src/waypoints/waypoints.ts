import { api } from 'encore.dev/api';
import { VerseID } from '../utils/IDType';
import { MaxLen } from 'encore.dev/validate';
import { DTO } from '../utils/JSAPI';
import { Database } from '../database/database';

export interface Waypoint {
  id: VerseID;
  owner_id: VerseID;
  parent_id?: VerseID;
  name: (string & MaxLen<64>) | null;
  public: boolean;
  category: (string & MaxLen<64>) | null;
}

type CreateWaypointCMD = Omit<Waypoint, 'id'>;

export const create = api<CreateWaypointCMD, DTO<Waypoint>>(
  {
    method: 'POST',
    expose: true,
    path: '/waypoints',
    // auth: true,
  },
  async (cmd) => {
    console.log(cmd);
    return { data: { ...cmd, id: '' } };
  },
);

export const listPublic = api<void, DTO<Waypoint[]>>(
  {
    method: 'GET',
    expose: true,
    path: '/waypoints/public',
  },
  async () => {
    const waypoints_raw = Database.query`SELECT * FROM waypoints WHERE public = 't'`;
    const waypoints = (await Array.fromAsync(waypoints_raw)) as Waypoint[];
    return { data: waypoints };
  },
);
