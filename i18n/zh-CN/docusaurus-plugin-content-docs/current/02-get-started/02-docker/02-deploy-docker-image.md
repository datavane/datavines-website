---
id: 'deploy-docker-image'
title: '运行Docker镜像'
---

## 背景说明

本篇将简述如何通过`docker run`或`docker-compose`命令快速运行Datavines。

## 软件环境

|       软件       |    版本    | 
|:--------------:|:--------:|
|     Docker     | 20.0及以上  |
| docker-compose | 2.10 及以上 | 

## 方法一(推荐)：docker-compose

### 前期准备

1.下载并修改[docker-compose.yaml](https://raw.githubusercontent.com/datavane/datavines/dev/deploy/compose/docker-compose.yaml)

* 修改镜像版本为本地编译版本或私仓镜像版本

```
image: datavines:dev
```

* 如出现外部网段与容器内部网段冲突，表现为容器同网段可访问，跨网段无法访问，可修改`docker-compose.yaml`文件中的`network_mode`。

```
networks:
  datavines:
    driver: bridge
    ipam:
      config:
        - subnet: 172.18.0.0/24(自定义网段)
```

2. 下载环境配置文件[.env](https://raw.githubusercontent.com/datavane/datavines/dev/deploy/compose/.env)
3. 修改`.env`文件中的配置项，参考如下：

```
# 数据库连接
SPRING_DATASOURCE_URL=jdbc:mysql://127.0.0.1:3306/datavines?useSSL=false&useUnicode=true&characterEncoding=UTF-8&allowPublicKeyRetrieval=false&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=GMT%2B8
# 数据库用户名
SPRING_DATASOURCE_USERNAME=root
```

### 快速启动

```
docker compose up -d
```

## 方法二：docker run
环境参数需从启动命令中传入，如下。
```
docker run -it -d --name datavines -p 5600:5600 --privileged=true --restart always -e SPRING_PROFILES_ACTIVE=mysql -e SPRING_DATASOURCE_URL=jdbc:mysql://127.0.0.1:3306/datavines?useSSL=false&useUnicode=true&characterEncoding=UTF-8&allowPublicKeyRetrieval=false&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=GMT%2B8 -e SPRING_DATASOURCE_USERNAME=root -e SPRING_DATASOURCE_PASSWORD=123456 -e SPRING_DATASOURCE_DRIVER-CLASS_NAME=com.mysql.cj.jdbc.Driver datavines:dev
```
