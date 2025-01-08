import { Mapper } from '@Infrastructure/Mapper';
import type { IUser } from 'vl-shared/src/schemas/UserSchema';
import type { User } from '@V1/models/user/user.model';
import { UserDTO } from './UserDTO';

export class UserToUserDTOMapper extends Mapper<User, UserDTO> {
  public static override map(artifact: User): UserDTO {
    const user: IUser = artifact.get();
    return new UserDTO(user);
  }
}
