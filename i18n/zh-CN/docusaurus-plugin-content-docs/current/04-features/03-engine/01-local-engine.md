---
id: 'local-engine'
title: 'Local 引擎'
---

## 原理解释

`Local` 引擎是通过 `Jdbc` 的方式连接数据源，执行根据数据质量检查规则生成的 `SQL` 语句，得到相应的错误数据视图、实际值和期望值，最后将实际值和期望值写到 `Datavines` 系统的执行结果表以及将错误数据视图中的数据写到错误数据存储引擎。

## 使用方法

`Local` 引擎的使用非常简单，创建数据质量检查作业时默认使用的是 `Local` 引擎，无需做任何额外的配置，保存好配置执行即可，需要关注一下注意事项。

## 注意事项

- 用于创建数据源的用户需要有创建视图和删除视图的权限，如果你想要将错误数据写入到检查的数据源中某个库中，那么你的用户需要有创建表的权限。