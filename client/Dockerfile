FROM oven/bun
WORKDIR /usr/src/app
COPY package.json ./package.json
RUN bun install
COPY . .
EXPOSE 3030
# RUN bunx --bun vite build --debug
CMD [ "bunx","--bun","vite","--host", "0.0.0.0" ]
