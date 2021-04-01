FROM node:erbium-alpine 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

COPY . ./

EXPOSE 3001

CMD [ "node", "bot.js" ]