import { Container } from 'inversify';

import { ContractService } from '@Services/contracts.service';
import { TYPES } from '@Constant/types';
import { AuthService } from '@Services/auth.service';
import { EnvService } from '@Services/env.service';
import { UserService } from '@Services/user.service';
import { StompService } from '@Services/stomp.service';
import { AuthMiddleware } from '@Middleware/auth.middleware';
import { VerifiedUserMiddleware } from '@Middleware/verified.middleware';
export const bindContainer = (container: Container) => {
  container.bind<EnvService>(TYPES.EnvService).to(EnvService);
  container.bind<ContractService>(TYPES.ContractService).to(ContractService);
  container.bind<AuthService>(TYPES.AuthService).to(AuthService);
  container.bind<UserService>(TYPES.UserService).to(UserService);
  container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);
  container
    .bind<VerifiedUserMiddleware>(TYPES.VerifiedUserMiddleware)
    .to(VerifiedUserMiddleware);
  container.bind<StompService>(TYPES.StompService).to(StompService);
};
