FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm config set @scope:registry http://172.17.0.3:4873
RUN npm install --only=prod
COPY . .
CMD ["npm", "run", "dev"]