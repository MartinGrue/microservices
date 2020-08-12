#!/bin/bash
ln -fs .dockerignore.posts .dockerignore
docker build -f Dockerfile.posts -t localhost:5000/msposts .