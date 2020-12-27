FROM node:alpine
WORKDIR /app
COPY package.json .
# ENV EC2_verdaccio="http://3.23.98.245:4873"
# RUN npm install --only=prod --verbose --registry ${EC2_verdaccio}
RUN npm install --only=prod --verbose --registry https://scope.bytesafe.dev/r/default/
COPY . .
CMD ["npm", "run", "dev"]