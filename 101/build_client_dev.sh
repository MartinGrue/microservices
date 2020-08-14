#!/bin/bash
ln -fs .dockerignore.react .dockerignore
docker build -f Dockerfile.react.dev -t $IMAGE .