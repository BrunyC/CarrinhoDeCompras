FROM node:18 As builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

RUN npm i -g @nestjs/cli

COPY . .

RUN npm run prisma:generate

RUN npm run build:ml-user

FROM keymetrics/pm2:16-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/config ./config

CMD [ "npm", "run", "start:docker:ml-user" ]
