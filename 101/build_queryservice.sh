#!/bin/bash
ln -fs .dockerignore.queryservice .dockerignore
docker build -f Dockerfile.queryservice -t localhost:5000/msquery .