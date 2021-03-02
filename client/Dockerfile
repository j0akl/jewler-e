FROM node:12-alpine

RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN npm run build
CMD ["npm", "run", "dev"]
