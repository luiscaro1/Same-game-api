FROM node:buster-slim

WORKDIR /app

COPY package.json /app/

RUN npm install 

COPY dist /app/

ENV BUILD WEBPACK


ENV BUILD WEBPACK
ENV MEDIA https://same-media-api.herokuapp.com/stream/upload
ENV CLIENT_URL http://localhost:3000

CMD node bundle.js --bind:0.0.0.0










