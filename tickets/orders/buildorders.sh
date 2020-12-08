#!/bin/bash
npm update @scope/common --registry http://verdaccio:4873
docker build -t $IMAGE --network host --file ./Dockerfile.dev . 