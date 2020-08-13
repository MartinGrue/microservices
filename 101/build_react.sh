#!/bin/bash
ln -fs .dockerignore.react .dockerignore
docker build -f Dockerfile.react -t localhost:5000/msreact .