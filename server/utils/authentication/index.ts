import oauth2, { TOAuth2AccessToken, discord } from '../oauth';
import { randomBytes } from 'crypto';

let globalState = randomBytes(16).toString('hex');
let globalToken: TOAuth2AccessToken = null as unknown as TOAuth2AccessToken


export const authentication = oauth2({
  host: 'localhost:3131',
  profiles: {
    discord: {
      provider: discord(),
      scope: ['email identify']
    }
  },
  storage: {
    async delete(req, name) {
      switch (name) {
        case 'discord':
          globalToken = null as unknown as TOAuth2AccessToken
          break
      }
    },
    async get(req, name) {
      switch (name) {
        case 'discord':
          return req?.cookie?.auth
      }
    },
    async set(req, name, token) {
      const REQ = req as any
      switch (name) {
        case 'discord':
          break
      }
    },
  },
  state: {
    check(req, name, state) {
      switch (name) {
        case 'discord':
          return globalState === state
      }
    },
    generate(req, name) {
      switch (name) {
        case 'discord':
          return globalState
      }
    },
  }
})
