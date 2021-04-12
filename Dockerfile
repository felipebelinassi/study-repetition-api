FROM node:alpine

WORKDIR /usr/study-repetition-api

COPY package.json .

RUN yarn

COPY . .

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]