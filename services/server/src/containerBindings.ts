import { Container } from 'inversify';

import { ContractService } from '@V1/models/contract/contract.service';
import { TYPES } from '@Constant/types';
import { AuthService } from '@V1/models/auth/auth.service';
import { EnvService } from '@V1/services/env.service';
import { UserService } from '@V1/models/user/user.service';
import { StompService } from '@V1/services/stomp.service';
import { AuthMiddleware } from '@V1/middleware/auth.middleware';
import { VerifiedUserMiddleware } from '@V1/middleware/verified.middleware';
import { TestingMiddleware } from '@V1/middleware/testing.middleware';
import { NotificationService } from '@V1/models/notifications/notification.service';
import { Logger } from './utils/Logger';
import { PallyService } from '@V1/models/donation/pally.service';
import { ResourceEditorService } from '@V1/services/resource_editor.service';
import { RatingService } from '@V1/models/user_ratings/rating.service';
import { UserSettingsService } from '@V1/models/user_settings/user_settings.service';
import { ChatService } from '@V1/models/chat/chat.service';
import { ContractBidsService } from '@V1/models/contract_bid/contract_bid.service';
import { LocationService } from '@V1/models/location/locations.services';
import { OrganizationService } from '@V1/models/organization/organization.services';
import { SubscriptionService } from '@V1/models/subscriptions/subscriptions.service';
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
    .bind<UserSettingsService>(TYPES.UserSettingsService)
    .to(UserSettingsService)
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
  container
    .bind<ResourceEditorService>(TYPES.ResourceEditorService)
    .to(ResourceEditorService)
    .inSingletonScope();
  container
    .bind<RatingService>(TYPES.RatingService)
    .to(RatingService)
    .inSingletonScope();
  container
    .bind<ChatService>(TYPES.ChatService)
    .to(ChatService)
    .inSingletonScope();
  container
    .bind<ContractBidsService>(TYPES.ContractBidsService)
    .to(ContractBidsService)
    .inSingletonScope();
  container
    .bind<LocationService>(TYPES.LocationService)
    .to(LocationService)
    .inSingletonScope();
  container
    .bind<OrganizationService>(TYPES.OrganizationService)
    .to(OrganizationService)
    .inSingletonScope();
  container
    .bind<SubscriptionService>(TYPES.SubscriptionService)
    .to(SubscriptionService)
    .inSingletonScope();
};
