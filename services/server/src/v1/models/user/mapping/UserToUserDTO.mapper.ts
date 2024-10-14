/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mapper } from '@/infrastructure/Mapper';
import { IUser } from 'vl-shared/src/schemas/UserSchema';
import { User } from '@V1/models/user/user.model';
import { UserDTO } from './UserDTO';

export class UserToUserDTOMapper extends Mapper<User, UserDTO> {
  public static override map(artifact: User): UserDTO {
    const user: IUser = artifact.get();
    return new UserDTO(user);
  }
}
