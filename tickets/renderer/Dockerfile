FROM node:alpine
WORKDIR /app
COPY package.json .
# RUN npm config set registry http://localhost:4873
# RUN npm install --only=prod --verbose --registry http://localhost:4873
RUN npm install --only=prod --verbose --registry http://verdaccio:4873
COPY . .
CMD ["npm", "run", "dev"]