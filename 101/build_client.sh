#!/bin/bash
ln -fs .dockerignore.react .dockerignore
docker build -f Dockerfile.react -t $IMAGE .
docker push $IMAGE