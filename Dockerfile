FROM node:14.15.1-alpine3.10

RUN mkdir -p /usr/src/dmbot
WORKDIR /usr/src/dmbot

COPY config.json /usr/src/dmbot
COPY package.json /usr/src/dmbot
RUN npm install

COPY . /usr/src/dmbot

CMD ["npm", "start"]