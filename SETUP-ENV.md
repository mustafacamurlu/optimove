
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
  + minikube config set memory 8192
  + minikube config set cpus 4
  + minikube start — driver=docker
* Verify minikube installation
  + minikube status
  + kubectl cluster-info
  + kubectl get nodes

* Install ingress
  + minikube addons enable ingress

Tool versions:
- docker version
Client: Docker Engine - Community
 Version:           27.3.1
 API version:       1.47
 Go version:        go1.22.7
 Git commit:        ce12230
 Built:             Fri Sep 20 11:40:59 2024
 OS/Arch:           linux/amd64
 Context:           default

Server: Docker Engine - Community
 Engine:
  Version:          27.3.1
  API version:      1.47 (minimum version 1.24)
  Go version:       go1.22.7
  Git commit:       41ca978
  Built:            Fri Sep 20 11:40:59 2024
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.7.22
  GitCommit:        7f7fdf5fed64eb6a7caf99b3e12efcf9d60e311c
 runc:
  Version:          1.1.14
  GitCommit:        v1.1.14-0-g2c9f560
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0

- minikube version
minikube version: v1.34.0
commit: 210b148df93a80eb872ecbeb7e35281b3c582c61

- kubectl version
Client Version: v1.31.0
Kustomize Version: v5.4.2
Server Version: v1.31.0


- kubectl get nodes
NAME       STATUS   ROLES           AGE   VERSION
minikube   Ready    control-plane   22d   v1.31.0


$ sudo apt update
$ sudo apt install nginx
$ minikube ip

$ sudo vim /etc/nginx/nginx.conf

stream {
        server {
                listen 192.168.56.116:8080;
                proxy_pass 192.168.49.2:30080;
        }

        server {
                listen 192.168.56.116:8081;
                proxy_pass 192.168.49.2:30081;
        }
}


$ sudo nginx -t
$ sudo systemctl enable nginx
$ sudo systemctl restart nginx