FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm i -g @nestjs/cli
RUN npm i pm2@latest -g

COPY . .

RUN npm run build:microservices

EXPOSE 8888

CMD [ "npm", "run", "start:docker" ]
