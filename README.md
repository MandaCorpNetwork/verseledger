# How to use

Pre-requisits:

[Docker](https://www.docker.com/)

[Bun (Linux Only)](https://bun.sh/)

[Flyway](https://www.red-gate.com/products/flyway/community/download/)

# Install

## Windows

```bash
# Yarn
$ cd src/server && yarn install && cd ../client && yarn install && cd ../..
# NPM
$ cd src/server && npm i && cd ../client && npm i && cd ../..
# PNPM
$ cd src/server && pnpm i && cd ../client && pnpm i && cd ../..
```

## Linux (Requires [Bun](https://bun.sh) Runtime)

```bash
$ cd src/server && bun install && cd ../client && bun install && cd ../..
```

# How to Start

```bash
$ docker-compose --profile local up --build
```

# ENV

Server requires a `.env` file or ENV_VARS to function.
Place this file in the server root

Vars Needed:

```
DISCORD_OAUTH_CLIENT_ID=String
DISCORD_OAUTH_CLIENT_SECRET=String
AUTH_REDIRECT=http://localhost:3131
``````
