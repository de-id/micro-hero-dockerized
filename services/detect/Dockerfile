FROM node:lts

RUN apt-get update && apt-get install python3

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD sleep 15 && npm run start