FROM node

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install 

RUN yarn run build

EXPOSE 4000

CMD []

