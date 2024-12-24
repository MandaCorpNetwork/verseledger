import { Topic } from 'encore.dev/pubsub';

export interface InvalidPermissionEvent {
  user_id: string;
  token_id: string;
  permission: string;
  time: Date;
}

export const invalidPermissionEvent = new Topic<InvalidPermissionEvent>(
  'invalid-permission-attempt',
  {
    deliveryGuarantee: 'exactly-once',
  },
);
