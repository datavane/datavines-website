---
id: 'environment-preparation'
title: 'Environment Preparation'
sidebar_position: 2
---

# DataVines Environmental Setup Guide

## Software Requests

Please make sure you have installed the software as follow

* [Git](https://git-scm.com/downloads): 
* [JDK](https://www.oracle.com/technetwork/java/javase/downloads/index.html)
* [Maven](http://maven.apache.org/download.cgi)

### Clone Git Repository

```
mkdir datavines
cd datavines
git clone https://github.com/datavines-ops/datavines.git
```
### Compile source code  

* If you use MySQL as your metadata database, you need to modify datavines/pom.xml and change the scope of the mysql-connector-java dependency to compile. This step is not necessary to use PostgreSQL
* Run ` mvn clean install -Prelease -Dmaven.test.skip=true ` 

### Database

The DataVines's metadata is stored in relational database. Currently supported MySQL and Postgresql. We use MySQL as an example. Start the database and create a new database named datavines as DataVines metabase

After creating the new database, run the sql file under`script/sql/datavines-mysql.sql` to complete the database initialization

## Start DataVinesServer

Following steps will guide how to start the DataVinesServer

### Prepare

* Open project: Use IDE open the project, here we use Intellij IDEA as an example

* Configure database related information
  * If you use MySQL as your metadata database, you need to modify datavines/pom.xml and change the scope of the mysql-connector-java dependency to compile. This step is not necessary to use PostgreSQL
  * change database config in  `datavines-server/src/main/resources/application.yaml` 

  For example
  ```application.yaml
   spring:
     datasource:
       driver-class-name: com.mysql.cj.jdbc.Driver
       url: jdbc:mysql://127.0.0.1:3306/datavines?useUnicode=true&characterEncoding=UTF-8
       username: root
       password: 123456
  ```

### Start Service

Start `DataVinesServer`

> add options in VM Options 
 - `-Dspring.profiles.active=mysql` 
 - `-Dlogging.config=classpath:server-logback.xml` 
 
When you see the log that `[INFO] 2022-04-10 12:29:05.447 io.datavines.server.DataVinesServer:[61] - Started DataVinesServer in 3.97 seconds (JVM running for 4.69)` in console，DataVinesServer started successfully.
