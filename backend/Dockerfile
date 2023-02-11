FROM node:16-alpine as purrfect-creations-api


WORKDIR /home/node/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "dist/main.js"]