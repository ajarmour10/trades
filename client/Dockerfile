FROM node:18-alpine
WORKDIR /client
COPY package.json ./
COPY src ./src
RUN npm install && npm run build
CMD ["npm", "start"]
