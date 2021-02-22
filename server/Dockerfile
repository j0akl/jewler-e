FROM node:12-alpine

RUN mkdir -p /usr/src/app/server
WORKDIR /usr/src/app/server

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

CMD ["npm", "run", "dev"]
