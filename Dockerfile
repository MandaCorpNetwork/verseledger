# ---------- Build stage ----------
FROM node:24-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
COPY apps/client/package.json ./apps/client/
COPY apps/server/package.json ./apps/server/


RUN yarn install --frozen-lockfile

COPY apps/client/ ./apps/client/
COPY apps/server/ ./apps/server/

RUN yarn build

# ---------- Runtime stage ----------
FROM node:24-alpine AS runtime
WORKDIR /app

COPY --from=builder /package.json /yarn.lock ./
COPY --from=builder /apps/client/package.json ./apps/client/
COPY --from=builder /apps/server/package.json ./apps/server/
COPY --from=builder /app/apps/server/package.json /app/apps/server/
COPY --from=builder /app/apps/server/dist ./apps/server/dist
COPY --from=builder /app/apps/client/build ./apps/client/build

RUN yarn install --production --frozen-lockfile

EXPOSE 3030

CMD ["node", "./apps/server/dist/main.js"]
