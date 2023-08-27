---
id: 'source-module-explanation'
title: '源码模块解释'
---

# Datavines 代码架构解析

本文针对 Datavines 中各个核心模块进行较为详细的介绍

## datavines-server

datavines-server 是 datavines 中最核心的模块，核心功能包括对外提供 api 接口， 整个系统的数据管理， 数据源的元数据获取和管理， 数据质量规则的管理、调度和执行。它是无中心化设计，支持水平扩容提升性能，同时支持各种作业的容错处理。

## datavines-spi

datavines-spi 是 datavines 中的 SPI 模块，主要功能是设计了SPI接口和PluginLoader，PluginLoader是负责扫描有@SPI的插件，把具体的插件加载到系统中。

## datavines-connector

datavines-connector 是 datavines 中的数据源模块，datavines-connector-api 中定义了数据源的各种接口，比如 Connector 接口中定义了数据源各种元数据相关的接口，Executor 接口则是定义了数据源数据查询相关的接口，Dialect 接口里定义了数据源方言相关的接口。datavines-connector-plugins 中是各种数据源的具体实现，内置的数据源包括MySQL、Doris、Starrocks、Trino、Presto等10种数据源。

## datavines-metric

datavines-metric 是 datavines 中的规则模块，datavines-metric-api 中定义了规则、期望值、结果计算公式的接口。SqlMetric接口主要是定义规则的类型、实际值计算逻辑等相关方法。ExpectedValue接口主要是定义了期望值的计算逻辑相关方法。ResultFormula接口主要是定义了检查公式的计算逻辑相关方法。

## datavines-engine

datavines-engine 是 datavines 中的作业执行引擎模块。datavines-engine-api 定义了 engine 相关的接口，Execution 接口主要是定义了作业执行的相关方法，execute 方法主要执行 source 的读取，对数据进行 transform，最后把数据 sink 到目的地。datavines-engine-config 模块主要是定义了作业配置文件的构造逻辑和相关方法。datavines-engine-executor 模块是定义了作业执行器相关逻辑

## datavines-registry

datavines-registry 是 datavines 中的注册中心。 datavines-registry-api 定义了 获取锁、释放锁、获取当前活跃节点、节点上下线通知等接口。datavines-registry-plugins 中内置了三个类型的注册中心，包括 MySQL、PostgreSQL 和 ZooKeeper。
## datavines-notification

datavines-notification 是 datavines 中的通知通道管理。 datavines-notification-api 定义了通知通道的消息通知、配置参数等接口。datavines-notification-plugins 中内置了 email 类型的通知通道实现。

## datavines-runner

datavines-runner 是 datavines 中负责脚本模式运行数据质量检查的模块，主要功能是读取配置文件、解析配置文件，执行数据质量检查，判断检查结果，运行告警处理。
