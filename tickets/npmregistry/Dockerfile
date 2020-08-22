FROM node:alpine
WORKDIR /app
RUN npm install -g verdaccio
COPY ~/.local/share/verdaccio/storage /verdaccio/storage/data
EXPOSE 4873
RUN npm config set always-auth true 
CMD ["verdaccio", "--listen", "0.0.0.0:4873", "--config", "/app/config/config.yaml"]