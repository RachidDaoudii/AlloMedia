FROM node:18.12.1

WORKDIR /clientside

COPY package*.json .


RUN npm install

COPY  . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]