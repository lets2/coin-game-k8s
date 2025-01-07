# BUILDAR IMAGEM DA APLICAÇÃO

docker build -t lets2/app-node:1.0.0 .

# LISTAR IMAGEM

docker image ls

# CRIAR E EXECUTAR UM CONTAINER A PARTIR DA IMAGEM

docker run -d -p 3000:3000 --env-file .env --name app-node lets2/app-node:1.0.0

# LISTAR CONTAINER EM EXECUÇÃO

docker ps

# PARAR O CONTAINER

docker stop app-node
or
docker stop <container-id>

# ENVIAR PARA O REGISTRY DO DOCKERHUB

docker login
docker push lets2/app-node:1.0.0

# BAIXAR A IMAGEM EM OUTRA MÁQUINA

docker pull lets2/app-node:1.0.0

# INICIAR O MINIKUBE

minikube start

# CRIAR O NAMESPACE dev-ns

kubectl apply -f k8s/namespace.yaml
kubectl get ns

# REALIZAR O DEPLOY E VISUALIZAR

kubectl apply -f k8s/deployment.yaml
kubectl get pods -n dev-ns
kubectl get deployments -n dev-ns
kubectl get deployments app-node-deployment -n dev-ns -o yaml
kubectl get deployments app-node-deployment -n dev-ns -o wide
kubectl describe deploy app-node-deployment -n dev-ns

# CRIAR SERVICE PARA EXPOR PARA FORA DO CLUSTER

kubectl apply -f k8s/service.yaml
kubectl get svc app-node-service -n dev-ns -o wide
kubectl get svc app-node-service -n dev-ns -o yaml

# ACESSAR O SERVICE PELO MINIKUBE

para saber o ip use
minikube ip
ou
minikube service app-node-service -n dev-ns
http://192.168.58.2:30001/

# VISUALIZANDO A APLICAÇÃO:

Alternativamente, execute o comando abaixo e anote o INTERNAL-IP
kubectl get nodes -n dev-ns -o wide
A porta é o nodePort definido no yaml do service

# LOG DOS PODS

kubectl get pods -n dev-ns
kubectl logs <pod-name> -n dev-ns
kubectl logs app-node-deployment-78947cd554-c9ssg -n dev-ns
kubectl logs app-node-deployment-78947cd554-hsnbz -n dev-ns

# FAZER SCALE DOS PODS manualmente

kubectl scale deployment app-node-deployment --replicas=4 -n dev-ns
kubectl get pods -n dev-ns

# EXCLUIR O DEPLOYMENT

kubectl delete deployment app-node-deployment -n dev-ns

# -----------------------------------------------------------------------------

# CARREGANDO IMAGEM LOCAL E USANDO-A NO DEPLOYMENT EM VEZ DE BAIXAR DO REGISTRY

## build uma imagem sem colocar o username para ser apenas local

docker build -t my-img-app-node:1.0.1 .
docker image ls

## Inicie Minikube com cache local

minikube start --driver=docker

## Adicione a imagem ao Minikube via load

minikube image load imagename:version
minikube image load my-img-app-node:1.0.1

## Edite o deployment.yaml para usar a imagem local

image: imagename:version
image: my-img-app-node:1.0.1

## Reaplique o Deployment

kubectl apply -f k8s/deployment.yaml
