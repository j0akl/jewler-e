FROM node:12-alpine

ENV PORT 3000

RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client

COPY package.json yarn.lock /usr/src/app/client/
RUN yarn install

COPY . /usr/src/app/client/

EXPOSE 3000

CMD ["yarn", "dev"]
