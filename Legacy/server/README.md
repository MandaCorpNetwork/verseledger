<!-- TOC -->

- [Install](#install)
  - [Windows](#windows)
- [How to Start](#how-to-start)
- [ENV](#env)
- [Tools](#tools)
  - [Adminer](#adminer)
  - [ActiveMQ](#activemq)
  - [Configure DB](#configure-db)
  - [Flyway](#flyway)
- [Testing](#testing)
- [Package Documentation](#package-documentation)
  - [inversify-express-utils](#inversify-express-utils)
  - [sequelize-typescript](#sequelize-typescript)

<!-- /TOC -->

Pre-requisits:

[Docker](https://www.docker.com/)

# Install

## Windows

```bash
# NPM
$ yarn
```

# How to Start

```bash
$ docker-compose --profile local up --build -d
```

```bash
$ yarn dev
```

# ENV

Server requires a `.env` file or ENV_VARS to function.
Place this file in the server root

Vars Needed:

```env
DISCORD_OAUTH_CLIENT_ID=string
DISCORD_OAUTH_CLIENT_SECRET=string

AUTH_REDIRECT=string
AUTH_SECRET=string

MYSQL_DATABASE=string
MYSQL_USER=string
MYSQL_PASSWORD=string
MYSQL_HOST=string
MYSQL_PORT=number

EXPRESS_PORT=number
```

# Tools

## Adminer

[Open Local Adminer](http://localhost:8181) (Requires Docker be running)

Credentials

```env
server: vl-db
username: verseledger-app
password: verseledger-password
database: verseledger-app
```

## ActiveMQ

[Open Local ActiveMQ Console](http://localhost:8161/) (Requires Docker be running)

Credentials

```env
username: verseledger-app
password: verseledger-password
```

## Configure DB

```bash
$ yarn db:reset
```

> [!NOTE]
> This requires a file called `verseledger-app.sql` exist in the `scripts/` folder. This in future will be a data dump of Prod data.

## Flyway

Local `./flyway.user.toml`

```toml
[environments.vl-db]
url = "jdbc:mysql://localhost:3306?allowPublicKeyRetrieval=true&useSSL=false"
user = "root"
password = "verseledger-password"
schemas = [ "verseledger-app" ]
displayName = "VerseledgerDatabase"

```

We use Flyway for database migration.

SQL Migrations go in the `/migrations` folder.
The naming convention is `V${version}__${MigrationName}.sql`.

> [!CAUTION]
> Never modify an existing Migration script that has already run in Prod. This will error out the database.

Run all migration scripts with

```bash
$ yarn db:migrate
```

# Testing

```bash
$ yarn test
```

# Package Documentation

## [inversify-express-utils](https://github.com/inversify/inversify-express-utils)

## [sequelize-typescript](https://www.npmjs.com/package/sequelize-typescript)
