---
id: 'connector-impala'
title: 'Impala'
---

## 介绍

`Presto` 连接器用于与 `Presto` 类型的数据源建立连接，获取元数据和执行数据质量检查。

## 参数
### Options

|             name             |  type  |  required  | default value |
|:----------------------------:|:------:|:----------:|:-------------:|
|     [host](#host-string) | string |    yes     |       -       |
|    [port](#port-int)    | int |    yes     |       -       |
|   [database](#database-string)   | string |    yes     |       -       |
| [user](#user-string) | string |    yes     |       -       |
|    [password](#password-string)    | string |    yes     |       -       |
|   [properties](#properties-string)   | string |    no     |       -       |


#### host [string]
数据库实例IP
#### port [int]
数据库实例端口
#### database [string]
数据库名
#### user [string]
用户名
#### password [string]
密码
#### properties [string]
配置信息

## 属性

|             name             |  zh-name  |  supported  | 
|:----------------------------:|:------:|:----------:|
|   invalidateItemCanOutput   | 错误数据是否支持导出 |    true     |   
|    invalidateItemCanOutputToSelf    | 错误数据是否支持导出至数据源 |    false     |      
|   supportToBeErrorDataStorage   | 是否支持作为错误数据存储引擎 |    false     |     
