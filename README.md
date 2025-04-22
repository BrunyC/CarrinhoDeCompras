# ShoppCartMicroServices
Cart MicroServices

## Installation

```bash
npm install
```

## Build Development Containers Services (Docker)

> :warning:**WARNING**: Need to install [Docker](https://docs.docker.com/engine/install/ubuntu/) and [Docker Compose](https://docs.docker.com/compose/install/) before execute the command below

This part builds all the containers of the services using **Docker Compose** configuration set on submodule updated earlier.

```bash
npm run build:services
```

## Start Development Containers Services (Docker)

> :warning:**WARNING**: Need to execute the command above (build) before start the containers services.

```bash
npm run start:services
```

## Start Single Development Container Service (Docker)

```bash
npm run start:service:[Service]
```

## Stop Single Development Container Service (Docker)

```bash
npm run stop:service:[Service]
```

## Prisma

## To migrate database

```bash
npm run prisma:migrate
```

## To generate database

```bash
npm run prisma:generate
```

## Microservices

## Build Microservices

```bash
npm run build:microservices
```

### Build Single Microservice

```bash
nest build [Microservice]
```

## Start All Microservices with PM2

```bash
npm run start
```

## Start Specific Microservice(s) with PM2

```bash
pm2 start ecosystem.microservices.config.js --only=[Microservice]
```
## Stop All Microservices Execution in PM2

```bash
pm2 stop all
```

## Stop Specific Microservice(s) Execution in PM2

```bash
pm2 stop [Microservice] | [Process ID]
```

## Watch All Microservices Logs in PM2

```bash
pm2 logs
```

## Watch Specific Microservice Logs in PM2

```bash
pm2 logs [Microservice]
```

## Start Development

```bash
nest start [Microservice]
```

## Start Development in Watch Mode

> :warning:**WARNING**: Running the project in _watch_ mode is memory expensive, take care.

```bash
nest start [Microservice] --watch
```

## Run Eslint and Prettier to format and fix the code

```bash
npm run lint:format
```

## Docker

## To build api docker image

```bash
docker compose build api
```

## To build cart docker image

```bash
docker compose build cart
```
## To build and execute cart docker image

```bash
docker compose up -d cart --build
```

## Docs

## Swagger API

$ http://localhost:[PORT]/api/docs