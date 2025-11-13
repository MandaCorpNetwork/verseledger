FROM node:24-alpine

USER root

WORKDIR /app

COPY . .

RUN npx yarn install && npx yarn run build

EXPOSE 3000

EXPOSE 3030

CMD [ "npx", "yarn", "run", "start" ]
