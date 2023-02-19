FROM node:19-alpine AS deps

WORKDIR /usr/src/app

COPY package*.json tsconfig*.json  ./

RUN npm ci

COPY .  ./

RUN npm run build


FROM node:19-alpine AS builder

ENV NODE_ENV=production

RUN apk add --no-cache tini

WORKDIR /usr/src/app

RUN chown node:node .

USER node

COPY package*.json ./

RUN npm install

COPY --from=builder /usr/src/app/dist/ dist/

EXPOSE 4000

ENTRYPOINT [ "/sbin/tini","--", "node", "dist/src/app.js" ]