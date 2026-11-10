FROM oven/bun:1.2 AS build
WORKDIR /app
COPY package.json ./
RUN bun install --no-save
COPY server ./server
COPY tests ./tests
RUN bun test
RUN bun build server/index.tsx --target=bun --outdir=./compiled
FROM oven/bun:1.2
WORKDIR /app
ENV NODE_ENV=production PORT=8080
COPY package.json ./
RUN bun install --production --no-save
COPY server ./server
EXPOSE 8080
CMD ["bun","run","server/index.tsx"]
