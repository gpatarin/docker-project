FROM node:18.15.0-alpine as build
WORKDIR /build
COPY . .
RUN yarn && yarn build

FROM node:18.15.0-alpine
ARG DB_PORT
ENV DB_PORT $DB_PORT
WORKDIR /app
COPY --from=build /build/dist/ .
CMD ["node", "index.js"]

HEALTHCHECK --interval=5s --timeout=3s --start-period=10s --retries=3 CMD http -f GET http://localhost:{$DB_PORT}/healthcheck || exit 1