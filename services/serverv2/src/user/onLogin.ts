import { Subscription } from 'encore.dev/pubsub';
import { userLogin } from './user';
import { UserDB } from './user-database';

const _ = new Subscription(userLogin, 'update-last-login', {
  handler: async (event) => {
    await UserDB.exec`
    UPDATE
      users
    SET
      last_login = ${new Date(Date.now())}
    WHERE
      id = ${event.userId}
    `;
  },
});
