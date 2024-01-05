---
id: 'deploy-docker-image'
title: 'Run Docker Image'
---

## Description

This article will briefly describe how to quickly run Datavines using the 'Docker run' or 'Docker compile' commands.

## Environment

|    software    |    Version     | 
|:--------------:|:--------------:|
|     Docker     | 20.0 and above |
| docker-compose | 2.10 and above | 

## Method 1 (Recommended)：docker-compose

### Preparation in advance

1.Download and modify[docker-compose.yaml](https://raw.githubusercontent.com/datavane/datavines/dev/deploy/compose/docker-compose.yaml)

* Modify the image version to a locally compiled version or a private repository image version

```
image: datavines:dev
```

* If there is a conflict between the external network segment and the internal network segment of the container, which means that the container can be accessed within the same network segment, but cannot be accessed across different network segments,Can modify the `network_mode` in the `docker-compose.yaml` file.。

```
networks:
  datavines:
    driver: bridge
    ipam:
      config:
        - subnet: 172.18.0.0/24(Custom network segment)
```

2. Download environment configuration file[.env](https://raw.githubusercontent.com/datavane/datavines/dev/deploy/compose/.env)
3. Modify the configuration items in the `. env` file as follows:

```
# Database Connection
SPRING_DATASOURCE_URL=jdbc:mysql://127.0.0.1:3306/datavines?useSSL=false&useUnicode=true&characterEncoding=UTF-8&allowPublicKeyRetrieval=false&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=GMT%2B8
# User name
SPRING_DATASOURCE_USERNAME=root
```

### Quick Start

```
docker compose up -d
```

## Method 2 ：docker run

The environmental parameters need to be passed in from the startup command, as shown below.

```
docker run -it -d --name datavines -p 5600:5600 --privileged=true --restart always -e SPRING_PROFILES_ACTIVE=mysql -e SPRING_DATASOURCE_URL=jdbc:mysql://127.0.0.1:3306/datavines?useSSL=false&useUnicode=true&characterEncoding=UTF-8&allowPublicKeyRetrieval=false&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=GMT%2B8 -e SPRING_DATASOURCE_USERNAME=root -e SPRING_DATASOURCE_PASSWORD=123456 -e SPRING_DATASOURCE_DRIVER-CLASS_NAME=com.mysql.cj.jdbc.Driver datavines:dev
```
