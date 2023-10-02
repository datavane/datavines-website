---
id: 'connector-trino'
title: 'Trino'
---

## 介绍

`Trino` 连接器用于与 `Trino` 类型的数据源建立连接，获取元数据和执行数据质量检查。

## 参数
### Options

|             name             |  type  |  required  | default value |
|:----------------------------:|:------:|:----------:|:-------------:|
|     [host](#host-string) | string |    yes     |       -       |
|    [port](#port-int)    | int |    yes     |       -       |
|   [catalog](#catalog-string)   | string |    yes     |       -       |
|   [database](#database-string)   | string |    no     |       -       |
| [user](#user-string) | string |    yes     |       -       |
|    [password](#password-string)    | string |    no     |       -       |
|   [properties](#properties-string)   | string |    no     |       -       |


#### host [string]
数据库实例IP
#### port [int]
数据库实例端口
#### catalog [string]
catalog
#### database [string]
数据库名
#### user [string]
用户名
#### password [string]
密码
#### properties [string]
配置信息，用&隔开

## 属性

|             name             |  zh-name  |  supported  | 
|:----------------------------:|:------:|:----------:|
|   invalidateItemCanOutput   | 错误数据是否支持导出 |    true     |   
|    invalidateItemCanOutputToSelf    | 错误数据是否支持导出至数据源 |    false     |      
|   supportToBeErrorDataStorage   | 是否支持作为错误数据存储引擎 |    false     |     
