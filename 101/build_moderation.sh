#!/bin/bash
ln -fs .dockerignore.moderation .dockerignore
docker build -f Dockerfile.moderation -t localhost:5000/msmoderation .