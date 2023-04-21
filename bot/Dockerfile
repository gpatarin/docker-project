FROM node:18.15.0-alpine as build

WORKDIR /build
COPY . .
RUN yarn && yarn build

FROM node:18.15.0-alpine
ARG PORT
ENV PORT $PORT
WORKDIR /app
COPY --from=build /build/dist/ .
CMD ["node", "index.js"]
