---
id: 'build-docker-image'
title: 'Build Docker Image'
---

## Build Docker Image
This document mainly introduces how to use Dockerfile to create a running image of DataVines, so that a DataVines Image can be quickly pulled to complete cluster creation in containerized orchestration tools or rapid testing processes.
## Prepare Dockerfile
The following points should be noted when writing Dockerfile:
>1. The basic parent image uses the official OpenJDK image certified by Docker Hub, with JDK version 1.8 used.
>2. The binary packages required for the application need to be packaged by oneself. Please refer to the [Deploy with Source Code](../01-deploy-from-source.md)
>3. When starting an application within Docker, use `start_container` parameter
>4. The construction platform should be consistent with the operation platform.

### Build Steps
* Write a Dockerfile file, which can be referenced as follows [Dockerfile](
https://raw.githubusercontent.com/datavane/datavines/dev/deploy/docker/Dockerfile),Can be downloaded through wget。
* Copy the packaged binary package to the directory where Dockerfile is located。
* Verify the consistency of binary package names in Dockerfile files。
* Pack and pack using the following command
```
docker build -t datavines:dev .
```

## Push images to DockerHub or private warehouse
Login to DockerHub account
```
docker login -u <username> <hubaddress>
```
Successful login will prompt a Success related prompt.

change the image tag
```
docker tag datavines:dev <hubaddress>/<namespace>/datavines:dev
```

push image to DockerHub
```
docker push <hubaddress>/<namespace>/datavines:dev
```