FROM node:16

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm rebuild sqlite3


EXPOSE 4000

CMD ["node", "dist/app.js"]