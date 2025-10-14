FROM node:24-alpine

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

# Increase Node.js memory limit for build
ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm run build

CMD ["npm", "run", "start"]