FROM node:18-alpine

WORKDIR /app
COPY ./package.json /app
COPY ./src /app/src

RUN npm install

ENTRYPOINT npm start