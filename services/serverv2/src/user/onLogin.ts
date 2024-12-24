import { Subscription } from 'encore.dev/pubsub';
import { userLogin } from './user';
import { VLDB } from '../vl-database/vl-database';

const _ = new Subscription(userLogin, 'update-last-login', {
  handler: async (event) => {
    await VLDB.exec`
    UPDATE
      users
    SET
      last_login = ${new Date(Date.now())}
    WHERE
      id = ${event.userId}
    `;
  },
});
