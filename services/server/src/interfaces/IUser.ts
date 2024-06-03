import { ITimestamped } from './ITimestamped';
export interface IUser extends ITimestamped {
  id: string;
  handle: string | null;
  pfp: string | null;
}
