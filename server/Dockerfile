FROM node:12-alpine

RUN mkdir -p /usr/src/app/server
WORKDIR /usr/src/app/server

COPY package.json yarn.lock /usr/src/app/server/
RUN yarn install

COPY . /usr/src/app/server/

CMD ["yarn", "dev"]
