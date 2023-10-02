---
id: 'livy-engine'
title: 'Livy 引擎'
---

## 原理解释

`Livy` 引擎是基于 `Livy` 开发的数据质量检查作业执行引擎，使得`Datavines`可以将 `Spark` 应用提交到 `Livy` 上去执行。

## 使用方法

在数据质量检查作业和数据比对作业中的引擎配置中选择 `Livy` 引擎，填好各种 `Spark` 相关的基础配置信息
![数据质量检查规则引擎配置](/doc/image/metric_job_engine.png)

## 注意事项
如果想要使用`Livy`引擎，需要完成`Livy`相关的配置
- 全局参数中配置`livy`开头的相关信息
- 将`/lib/datavines-engine-spark-core-1.0.0-SNAPSHOT.jar`上传到参数`livy.task.jar.lib.path`指定的位置
- 将作业任务相关`jar` (`plugins`目录下的`jar`) 上传到参数`livy.task.jar.lib.path`指定的位置，如果需要额外的`jar`，请自行上传
- 在作业配置`jar`具体为`--jar xx.jar,zz.jar`，若不指定`--jar`会默认按照`livy.task.jars`配置来执行,需要将相关文件上传
