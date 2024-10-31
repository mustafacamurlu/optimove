
* Linux environment is required (prefably Ubuntu Desktop/Server)
* Install docker
* Make sure docker cli can run without root (docker ps/image should not require sudo)
* Install minikube
  + sudo apt update
  + sudo apt install -y curl wget apt-transport-https
  + curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
  + sudo install minikube-linux-amd64 /usr/local/bin/minikube
  + curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
  + chmod +x kubectl
  + sudo mv kubectl /usr/local/bin/
  + minikube start — driver=docker
* Verify minikube installation
  + minikube status
  + kubectl cluster-info
  + kubectl get nodes

