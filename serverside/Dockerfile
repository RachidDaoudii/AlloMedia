FROM node:18.12.1

WORKDIR /serverside

COPY package*.json .

RUN npm install

COPY  . .

EXPOSE 5000

CMD [ "node", "app.js" ]















