# build-stage
FROM node:18 as build-stage

WORKDIR /app

COPY --chown=root:root package*.json ./
COPY --chown=root:root . .
RUN npm i
RUN npm ci --only=production && npm cache clean --force

# production-stage
FROM node:18 as production-stage

WORKDIR /app

COPY --chown=root:root --from=build-stage /app /app

ENTRYPOINT ["npm", "start"]