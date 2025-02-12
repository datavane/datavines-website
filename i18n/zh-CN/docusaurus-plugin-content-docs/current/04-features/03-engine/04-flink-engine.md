---
id: 'flink-engine'
title: 'Flink 引擎'
---

## 原理解释

`Flink` 引擎是基于 `Flink` 开发的数据质量检查作业执行引擎，使得`Datavines`可以将 基于`Flink`开发的数据质量检查应用 提交到 `Yarn` 上去执行。

## 使用方法

在数据质量检查作业和数据比对作业中的引擎配置中选择 `FLink` 引擎，填好各种 `Flink` 相关的基础配置信息
![数据质量检查规则引擎配置](/doc/image/metric_job_engine_flink.png)

## 注意事项
如果想要使用`Flink`引擎，需要完成`Flink`相关的配置
- 将`datavines`部署在能执行`bin/flink`命令的机器上
- 解压完安装包以后，将`./plugins/flink/`目录下的 `jar` 复制 `flink` 的`lib`目录下
- 配置env环境变量，`FLINK_HOME`指向`flink`的安装目录
![数据质量检查规则环境变量配置](/doc/image/metric_job_env_flink.png)