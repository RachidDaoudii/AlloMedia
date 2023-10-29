FROM node:18.12.1

WORKDIR /clientside

COPY . .

RUN npm install

EXPOSE 1757

CMD [ "npm", "run dev" ]