---
id: 'multi-table-accuracy'
title: '跨表准确性'
---

## 概念解释
跨表准确性是用于检查源表与目标表指定字段的数据差异，举个例子

表：test1

| C1|  C2  |
|:---:|:---:|
|a|1|
|b|2|

表：test2

| C21|  C22  |
|:---:|:---:|
|a|1|
|b|3|

如果对比c1和c21中的数据，则表test1和test2完全一致。 如果对比c2和c22则表test1和表test2中的数据则存在不一致了。

## 实现原理

通过 【源表 LEFT JOIN 目标表 on 源表.列1 = 目标表.列21 where 源表.列1 不等于 NULL 且 目标表.列21 等于 NULL】 SQL 语句来筛选出源表中存在的数据而目标表中不存在的数据.

## 使用方法
- 点击创建规则作业，选择数据比对作业
- 进入作业页面选择 跨表准确性 规则
- 进行源表和目标表的配置信息，选择要检查的字段

![两表值比对规则](/doc/image/metric_multi_table_accuracy.png)

## 参数介绍
### Options

|                              name                              |  type  |  required  | default value |
|:--------------------------------------------------------------:|:------:|:----------:|:-------------:|
|                  [database](#database-string)                  | string |    yes     |       -       |
|                     [table](#table-string)                     | string |    yes     |       -       |
|                 [database2](#database2-string)                 | string |    yes     |       -       |
|                    [table2](#table2-string)                    | string |    yes     |       -       |
|      [mappingColumns](#expected_execute_sql-string)            | string |    yes     |       -       |


#### database [string]
源表数据库名
#### table [string]
源表数据库中的表名
#### database2 [string]
目标表数据库名
#### table2 [string]
目标表数据库中的表名
#### mappingColumns [string]
要进行检查的字段，column 为 源表的字段，column2 为目标表的字段，格式如下：
```
[{\"column\":\"job_execution_id\",\"operator\":\"=\",\"column2\":\"job_execution_id\"}]
```

### 配置文件例子
```
{
  "metricType": "multi_table_value_comparison",
  "metricParameter": {
    "database": "datavines",
    "table": "dv_actual_values",
    "database2": "datavines",
    "table2": "dv_actual_values1",
    "mappingColumns": "[{\"column\":\"job_execution_id\",\"operator\":\"=\",\"column2\":\"job_execution_id\"}"
  }
}
```

### 注意事项

- 如果你进行检查的源表和目标表都在同一个数据库实例中，那么可以使用 `Local` 引擎来执行，如果源表和目标表在不同的数据库实例中，那么只能使用 `Spark` 引擎。

## 使用案例

### 场景
...
### 思路
...
### 步骤
...