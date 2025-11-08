import { Subscription } from 'encore.dev/pubsub';
import { userLogin } from './user';
import { Database } from '../database/database';

const _ = new Subscription(userLogin, 'update-last-login', {
  handler: async (event) => {
    await Database.exec`
    UPDATE
      users
    SET
      last_login = ${new Date(Date.now())}
    WHERE
      id = ${event.userId}
    `;
  },
});
