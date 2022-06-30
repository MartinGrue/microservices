
#!/bin/bash
docker build -t $IMAGE --network host --file ./Dockerfile.dev . 