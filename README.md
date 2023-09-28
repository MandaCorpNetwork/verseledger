# How to use

Pre-requisits:

[Docker](https://www.docker.com/)

[Bun (Linux Only)](https://bun.sh/)

# Install

## Windows

```bash
$ cd src/server && yarn install && cd ../client && yarn install && cd ../..
```

## Linux (Requires [Bun](https://bun.sh) Runtime)

```bash
$ cd src/server && bun install && cd ../client && bun install && cd ../..
```

# How to Start

```bash
$ docker-compose --profile local up --build
```
