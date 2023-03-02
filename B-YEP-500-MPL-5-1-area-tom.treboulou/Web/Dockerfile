FROM node:10

RUN mkdir -p /app

COPY . /app/

WORKDIR /app

COPY package*.json /app/

RUN npm install

EXPOSE 8081

CMD ["npm", "start"]