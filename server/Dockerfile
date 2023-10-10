FROM oven/bun
WORKDIR /usr/src/app
COPY package.json .
RUN bun install
COPY . .

CMD [ "bun", "start" ]
