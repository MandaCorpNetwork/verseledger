import { IUser } from 'vl-shared/src/schemas/UserSchema';

export type UserLocation = {
  id: string;
  user: IUser['id'];
  location: number;
};
