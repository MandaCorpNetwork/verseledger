import { Elysia, ws, t } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { cookie } from './utils/cookies';
import { authentication } from './utils/authentication';
import { jwt } from '@elysiajs/jwt';
import { cors } from '@elysiajs/cors'
import { logger } from '@bogeychan/elysia-logger';
import { randomBytes } from 'crypto';

const app = new Elysia()
.use(
  logger({
    level: 'error'
  })
)
  .use(swagger())
  .use(cors())
  .use(cookie())
  .use(jwt({
    name: 'unjwt',
    secret: randomBytes(16).toString('base64'),
  }))
  .use(authentication)

  .get('/', async ({ profiles, authorized, tokenHeaders }) => {
    if (await authorized('discord')) {
      const user = await fetch(`https://discord.com/api/v10/users/@me`, { headers: await tokenHeaders('discord') })
      const body = await user.json()
      return JSON.stringify(body)
    }
    return new Response(JSON.stringify(profiles('discord')), { status: 401 })
  })


  .listen(3131, () => {
    console.log('Running on port 3131')
  });

export type App = typeof app;
