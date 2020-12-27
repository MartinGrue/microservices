FROM verdaccio/verdaccio
USER verdaccio
WORKDIR /verdaccio/storage
COPY ./backup.tar /
ADD conf.yaml /verdaccio/conf/config.yaml
EXPOSE 4873