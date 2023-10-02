---
id: 'custom-aggregate-sql'
title: 'custom_aggregate_sql'
---

## 使用方法
- 点击创建规则作业，选择数据质量作业
- 进入作业页面选择 自定义聚合SQL 规则
- 选择要检查的数据源信息，编写自定义聚合 SQL 语句

![自定义聚合SQL规则](/doc/image/metric_custom_aggregate_sql.png)

## 参数介绍
### Options

|                              name                               |  type  |  required  | default value |
|:---------------------------------------------------------------:|:------:|:----------:|:-------------:|
|                  [database](#database-string)                   | string |    yes     |       -       |
|                     [table](#table-string)                      | string |    yes     |       -       |
|       [actual_aggregate_sql](#actual_execute_sql-string)        | string |    yes     |       -       |

#### database [string]
源表数据库名
#### table [string]
源表数据库中的表名
#### actual_aggregate_sql [string]
自定义聚合SQL，注意 as 后面的别名一定要是 **actual_value**，否则统计会出错。

### 配置文件例子
```
{
    "metricType": "custom_aggregate_sql",
    "metricParameter": {
        "database": "datavines",
        "table": "dv_actual_values",
        "actual_aggregate_sql": "select count(1) as actual_value from ${table}"
    }
}
```

## 使用案例

### 场景
...

### 思路
...

### 步骤
...