FROM node:18-alpine
WORKDIR /app
COPY package.json tsconfig.json jest.config.js ./
COPY src ./src
COPY tests ./tests
RUN npm install && npm run build
CMD ["node", "dist/index.js"]
