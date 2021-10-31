FROM node:buster-slim

WORKDIR /app

COPY package.json /app/

RUN npm i --only=production --ignore-scripts

COPY dist/prod.js /app/

ENV NODE_ENV production
ENV BUILD WEBPACK
ENV MEDIA https://same-media-api.herokuapp.com/stream/upload
ENV CLIENT_URL https://same-client-ui.herokuapp.com

CMD node prod.js --bind:0.0.0.0










