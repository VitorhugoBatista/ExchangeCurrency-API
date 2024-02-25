FROM node:16
RUN apt-get update && apt-get install -y python make g++ && rm -rf /var/lib/apt/lists/*
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install --build-from-source
COPY . /app
RUN npm run build
EXPOSE 4000
CMD ["node", "dist/src/index.js"]