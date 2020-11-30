FROM node:14.15.1-alpine3.10
LABEL author="Lucas Pauzies"

RUN mkdir -p /usr/src/dmbot
WORKDIR /usr/src/dmbot

COPY config.json /usr/src/dmbot
COPY package.json /usr/src/dmbot
# Install Python for discordjs opus
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
    && apk del .gyp

COPY . /usr/src/dmbot

CMD ["npm", "start"]