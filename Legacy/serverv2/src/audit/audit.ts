import { Subscription } from 'encore.dev/pubsub';
import { invalidPermissionEvent } from '../auth/permissionFailureTopic';

export const onInvalidEvent = new Subscription(
  invalidPermissionEvent,
  'onInvalidPerms',
  {
    handler: async (_event) => {
      //await AuditDB.exec``;
    },
  },
);
