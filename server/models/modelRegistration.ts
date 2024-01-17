import Elysia from 'elysia';
import { UserDTO } from './User/UserDTO.model';

export const modelRegistration = new Elysia().model({
  UserDTO,
});
