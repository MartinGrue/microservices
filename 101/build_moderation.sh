#!/bin/bash
ln -fs .dockerignore.moderation .dockerignore
docker build -f Dockerfile.moderation -t $IMAGE .