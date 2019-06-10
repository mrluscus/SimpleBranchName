################################################################################
# BASE IMAGE WITH DEPENDENCIES
################################################################################

FROM node:10-alpine as dependencies

ENV APP_HOME=/app

RUN mkdir -p ${APP_HOME}
WORKDIR ${APP_HOME}

COPY ./package.json ./package-lock.json ${APP_HOME}/

RUN npm set progress=false && npm ci

################################################################################
# IMAGE WITH SOURCES
################################################################################

FROM dependencies AS sources

COPY . ${APP_HOME}

################################################################################
# IMAGE WITH BUILT STATIC
################################################################################

FROM sources AS build

RUN npm run build

################################################################################
# RELEASE IMAGE
################################################################################

FROM nginx:alpine as release

RUN rm /etc/nginx/conf.d/default.conf /etc/nginx/nginx.conf
RUN /bin/sh -c "apk add --no-cache bash"
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /www/static

