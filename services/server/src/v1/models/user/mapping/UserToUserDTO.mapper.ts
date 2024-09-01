/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mapper } from '@/infrastructure/Mapper';
import { IUser } from 'vl-shared/src/schemas/UserSchema';
import { User } from '../user.model';
import { UserDTO } from './UserDTO';
import { Logger } from '@/utils/Logger';

export class UserToUserDTOMapper extends Mapper<User, UserDTO> {
  public static map(artifact: User): UserDTO {
    Logger.error(artifact);
    const user: IUser = artifact.get();
    Logger.error(user);
    return new UserDTO(user);
  }
}
