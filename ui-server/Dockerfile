FROM node:16-alpine as purrfect-creations-ui

WORKDIR /home/node/app

COPY ./ui/package.json .

RUN npm install

COPY ./ui/ .

ENV NODE_ENV production

RUN npm run build

COPY ./ui-server .


RUN npm install

CMD [ "node", "index.js"]
