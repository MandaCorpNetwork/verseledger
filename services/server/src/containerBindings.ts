import { Container } from 'inversify';

import { ContractService } from '@Services/contracts.service';
import { TYPES } from '@Constant/types';
import { AuthService } from '@Services/auth.service';
import { EnvService } from '@Services/env.service';
import { UserService } from '@Services/user.service';
import { StompService } from '@Services/stomp.service';
import { AuthMiddleware } from '@Middleware/auth.middleware';
import { VerifiedUserMiddleware } from '@Middleware/verified.middleware';
import { TestingMiddleware } from '@Middleware/testing.middleware';
import { NotificationService } from '@Services/notification.service';
import { Logger } from './utils/Logger';
import { PallyService } from '@Services/pally.service';
export const bindContainer = (container: Container) => {
  container
    .bind<EnvService>(TYPES.EnvService)
    .to(EnvService)
    .inSingletonScope();
  container
    .bind<ContractService>(TYPES.ContractService)
    .to(ContractService)
    .inSingletonScope();
  container
    .bind<AuthService>(TYPES.AuthService)
    .to(AuthService)
    .inSingletonScope();
  container
    .bind<UserService>(TYPES.UserService)
    .to(UserService)
    .inSingletonScope();
  container
    .bind<NotificationService>(TYPES.NotificationService)
    .to(NotificationService)
    .inSingletonScope();
  container
    .bind<AuthMiddleware>(TYPES.AuthMiddleware)
    .to(AuthMiddleware)
    .inSingletonScope();
  container
    .bind<TestingMiddleware>(TYPES.TestingMiddleware)
    .to(TestingMiddleware)
    .inSingletonScope();
  container
    .bind<VerifiedUserMiddleware>(TYPES.VerifiedUserMiddleware)
    .to(VerifiedUserMiddleware)
    .inSingletonScope();
  container
    .bind<StompService>(TYPES.StompService)
    .to(StompService)
    .inSingletonScope();
  container.bind<Logger>(TYPES.Logger).to(Logger).inSingletonScope();
  container
    .bind<PallyService>(TYPES.PallyService)
    .to(PallyService)
    .inSingletonScope();
};
