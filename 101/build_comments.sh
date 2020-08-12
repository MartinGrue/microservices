#!/bin/bash
ln -fs .dockerignore.comments .dockerignore
docker build -f Dockerfile.comments -t localhost:5000/mscomments .