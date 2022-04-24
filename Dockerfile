FROM node:16

WORKDIR app

COPY package*.json ./

RUN npm install

COPY controllers ./controllers
COPY repositories ./repositories
COPY models ./models
COPY database ./database
COPY index.js .

EXPOSE 3000

CMD node index.js