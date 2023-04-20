FROM node:18.15.0-alpine as build
ARG VITE_API_URL
ENV VITE_API_URL $VITE_API_URL
WORKDIR /build
COPY . .
RUN yarn && yarn build

FROM nginx
WORKDIR /usr/share/nginx/html
COPY --from=build /build/dist/ .

# On ne met pas de healthcheck car nginx est déjà scalable horizontalement et gérer par kubernetes 