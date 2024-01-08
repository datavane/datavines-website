---
id: 'build-docker-image'
title: '构建Docker镜像'
---

## 构建Docker Image
该文档主要介绍了如何通过 Dockerfile 来制作 DataVines 的运行镜像，以便于在容器化编排工具或者快速测试过程中可迅速拉取一个 Datavines Image 来完成集群的创建。

## 准备 Dockerfile
Dockerfile编写需注意以下几点：
>1. 基础父镜像选用经过 Docker-Hub 认证的 OpenJDK 官方镜像，版本用 JDK 1.8 版本。
>2. 应用所需二进制包需自行打包,参考 [用源码部署](../01-deploy-from-source.md) 章节。
>3. 应用在Docker内启动时应使用 `start_container` 参数
>4. 构建平台应与运行平台保持一致。

### 构建步骤
* 编写 Dockerfile 文件，可参考如下[Dockerfile](
https://raw.githubusercontent.com/datavane/datavines/dev/deploy/docker/Dockerfile),可通过wget进行下载。
* 复制打包好的二进制包到 Dockerfile 所在目录。
* 校验 Dockerfile 文件中二进制包名一致性。
* 通过如下命令进行打包。
```
docker build -t datavines:dev .
```

## 推送镜像至 DockerHub 或私有仓库
登录 DockerHub 账号
```
docker login -u <username> <hubaddress>
```
登录成功会提示 Success 相关提示。

更改镜像标签
```
docker tag datavines:dev <hubaddress>/<namespace>/datavines:dev
```

推送镜像
```
docker push <hubaddress>/<namespace>/datavines:dev
```