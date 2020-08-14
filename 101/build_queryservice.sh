#!/bin/bash
ln -fs .dockerignore.queryservice .dockerignore
docker build -f Dockerfile.queryservice -t $IMAGE .