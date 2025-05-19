FROM node:18-alpine
WORKDIR /worker
COPY package.json tsconfig.json ./
COPY src ./src
RUN npm install && npm run build
CMD ["node", "dist/worker.js"]
