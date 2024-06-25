FROM node:22-alpine

USER root

RUN apk add --no-cache bash

RUN apk add openjdk17

WORKDIR /app

COPY . .

RUN npx yarn install

RUN npx yarn run build

EXPOSE 3000

EXPOSE 3030

CMD [ "npx", "yarn", "run", "start" ]
