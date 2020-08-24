FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm install --only=prod --verbose --registry http://verdaccio:4873
COPY . .
CMD ["npm", "run", "start:watch"]