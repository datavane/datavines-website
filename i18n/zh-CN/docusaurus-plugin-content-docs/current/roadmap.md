---
id: 'roadmap'
title: '未来规划'
sidebar_position: 7
---
## V1.1.0
- 优化本地运行模式，支持配置文件在线生成
- 新增非 `Jdbc` 类型的数据源
    - 新增 `HDFS`、`Minio`、`S3`、`OSS`等文件系统数据源
    - 新增 `ElasticSearch` 数据源
    - 新增 `MonogoDB` 数据源
- 新增 `HDFS`、`S3` 错误数据存储引擎

## V1.2.0
- 支持 `Docker` 和 `K8s` 部署
- 支持 `Flink` 执行引擎
- 支持实时数据质量检查