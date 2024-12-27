import { Subscription } from 'encore.dev/pubsub';
import { invalidPermissionEvent } from '../auth/permissionFailureTopic';
import { SQLDatabase } from 'encore.dev/storage/sqldb';

export const AuditDB = new SQLDatabase('audit_database', {
  migrations: './migrations',
});

export const onInvalidEvent = new Subscription(
  invalidPermissionEvent,
  'onInvalidPerms',
  {
    handler: async (_event) => {
      //await AuditDB.exec``;
    },
  },
);
