#!/bin/bash
# npm update @scope/common --registry http://localhost:4873
docker build -t $IMAGE --network host --file ./Dockerfile.dev . 