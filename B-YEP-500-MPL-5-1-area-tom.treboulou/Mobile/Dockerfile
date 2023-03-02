FROM node:10

RUN mkdir -p /mobile

WORKDIR /mobile

COPY . /mobile

COPY package*.json /mobile/

RUN npm install
