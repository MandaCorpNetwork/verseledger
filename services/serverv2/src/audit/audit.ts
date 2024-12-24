import { Subscription } from 'encore.dev/pubsub';
import { invalidPermissionEvent } from '../auth/permissionFailureTopic';
import { SQLDatabase } from 'encore.dev/storage/sqldb';

export const AuditDB = new SQLDatabase('audit-database', {
  migrations: './migrations',
});

export const onInvalidEvent = new Subscription(
  invalidPermissionEvent,
  'onInvalidPerms',
  {
    handler: async (event) => {
      await AuditDB.exec``;
    },
  },
);
