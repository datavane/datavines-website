---
id: 'architeture-design'
title: '架构设计'
sidebar_position: 1
---

# DataVines 代码架构解析

## 核心模块

本文针对 Datavines 中各个核心模块进行较为详细的介绍

### datavines-server

datavines-server 是 datavines 中最核心的模块，核心功能包括对外提供 api 接口， 整个系统的数据管理， 数据源的元数据获取和管理， 数据质量规则的管理、调度和执行。它是无中心化设计，支持水平扩容提升性能，同时支持各种作业的容错处理。

### datavines-spi

### datavines-connector

datavines-connector 是 datavines 中的数据源模块，datavines-connector-api 中定义了数据源的各种接口，比如 Connector 接口中定义了数据源各种元数据相关的接口，Executor 接口则是定义了数据源数据查询相关的接口，Dialect 接口里定义了数据源方言相关的接口。datavines-connector-plugins 中是各种数据源的具体实现，内置的数据源包括MySQL、Doris、Starrocks、Trino、Presto等10种数据源。

### datavines-metric
### datavines-engine
### datavines-registry
### datavines-notification
### datavines-storage
### datavines-runner
