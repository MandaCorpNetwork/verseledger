import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { cookie } from './utils/cookies';
import { authentication } from './utils/authentication';
import { jwt } from '@elysiajs/jwt';
import { cors } from '@elysiajs/cors'
import { logger } from '@bogeychan/elysia-logger';
import { randomBytes } from 'crypto';
import { modelRegistration } from './models/modelRegistration';
import { sessionPlugin } from 'elysia-session';
const secret = process.env['AUTH_SECRET'] ?? randomBytes(32).toString('base64')

const app = new Elysia()
  .use(
    logger({
      level: 'debug'
    })
  )
  .use(swagger())
  .use(cors())
  .use(cookie())
  .use(jwt({
    name: 'vljwt',
    secret
  }))
  .use(authentication)
  .use(modelRegistration)


  .listen(3131, () => {
    console.log('Running on port 3131')
  });

export type App = typeof app;
