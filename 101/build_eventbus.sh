#!/bin/bash
ln -fs .dockerignore.eventbus .dockerignore
docker build -f Dockerfile.eventbus -t localhost:5000/mseventbus .