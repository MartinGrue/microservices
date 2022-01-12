#! /bin/bash
SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
echo $SCRIPT_DIR
DOCKER_BUILDKIT=1
COMPOSE_DOCKER_CLI_BUILD=1
network_name=minikubenet
docker network inspect minikubenet >/dev/null 2>&1 && \
{
for i in ` docker network inspect -f '{{range .Containers}}{{.Name}} {{end}}' $network_name`;
 do docker network disconnect -f $network_name $i; done;
docker network rm minikubenet
}
docker network create minikubenet
docker-compose -f $SCRIPT_DIR/verdaccio/docker-compose.yaml up -d 1> /dev/null
# ; docker-compose -f $SCRIPT_DIR/verdaccio/docker-compose.yaml down 
minikube start --vm-driver=docker --container-runtime=docker
minikube addons enable ingress
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.34.1/deploy/static/provider/cloud/deploy.yaml
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission

docker network connect minikubenet minikube
docker network connect minikubenet verdaccio

{
    cd $SCRIPT_DIR/verdaccio
    ./adduser.sh
    ./publish.sh
}

##Now start with skaffold dev