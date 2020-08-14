#!/bin/bash
ln -fs .dockerignore.comments .dockerignore
docker build -f Dockerfile.comments -t $IMAGE .