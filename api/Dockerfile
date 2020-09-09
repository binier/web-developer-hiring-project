#### INIT
FROM node:12.16.1 as init

WORKDIR /api
COPY . .

#### BUILD
FROM init as build

RUN yarn install
RUN yarn build

#### PROD
FROM init as prod

# copy build artifacts from 'build' stage
COPY --from=build /api/dist ./dist
RUN yarn install --production
EXPOSE 3000
CMD echo "running Api in prod environment" && yarn serve

#### DEV
FROM init as dev

EXPOSE 3000
CMD echo "running Api in dev environment" && yarn start:watch
