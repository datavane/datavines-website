---
id: 'multi-table-value-comparison'
title: '两表值比对'
---

## 使用方法
- 点击创建规则作业，选择数据比对作业
- 进入作业页面选择 两表值比对 规则
- 进行源表和目标表的配置信息，编写各自的检查SQL语句

![两表值比对规则](/doc/image/metric_multi_table_value_comparison.png)

## 参数介绍
### Options

|                              name                              |  type  |  required  | default value |
|:--------------------------------------------------------------:|:------:|:----------:|:-------------:|
|                  [database](#database-string)                  | string |    yes     |       -       |
|                     [table](#table-string)                     | string |    yes     |       -       |
|        [actual_execute_sql](#actual_execute_sql-string)        | string |    yes     |       -       |
|                 [database2](#database2-string)                 | string |    yes     |       -       |
|                    [table2](#table2-string)                    | string |    yes     |       -       |
|      [expected_execute_sql](#expected_execute_sql-string)      | string |    yes     |       -       |


#### database [string]
源表数据库名
#### table [string]
源表数据库中的表名
#### actual_execute_sql [string]
实际值执行SQL，注意 as 后面的别名一定要是 **actual_value**，否则统计会出错。
#### database2 [string]
目标表数据库名
#### table2 [string]
目标表数据库中的表名
#### expected_execute_sql [string]
期望值执行SQL，注意 as 后面的别名一定要是 **expected_value**，否则统计会出错。

### 配置文件例子
```
{
  "metricType": "multi_table_value_comparison",
  "metricParameter": {
    "database": "cbs",
    "table": "cbs_ratio",
    "actual_execute_sql": "select count(1) as actual_value from ${table}",
    "database2": "cbs",
    "table2": "cbs_ratio",
    "expected_execute_sql": "select count(1) as expected_value from ${table2}"
  }
}
```

## 使用案例

### 场景

比较某张表(有时间分区列)今天的数据量和昨天的数据量，如果今天的数据量小于昨天的数据量就需要告警。

### 思路
使用两表值比对规则配合内置时间参数。

>使用两表值比对的规则，通过编写 SQL 语句来统计今天和昨天的数据量，然后比较两个值，如果今天的值大于昨天的值则为真，否则为假。

### 步骤
- 选择数据比对作业中的两表值比对规则
- 选择对应的数据库和表，并编写计算实际值 SQL 语句。
    - 语句里面用到了`$[today]`时间变量，系统会自动替换成今天的日期，格式为`yyyy-MM-dd`，也可以自己配置格式 `$[today(yyyyMMdd)]`。
    - 注意 as 后面的别名一定要是 **actual_value**，否则统计会出错。
    - 表名可以用`${table}`，系统会自动替换，也可以直接写正确的表名。
```
select count(1) as actual_value from ${table} where data_date='$[today]'
```
- 选择对应的数据库和表，并编写计算期望值 SQL 语句
    - 语句里面用到了`$[yesterday]`时间变量，系统会自动替换成昨天的日期，格式为`yyyy-MM-dd`，也可以自己配置格式 `$[yesterday(yyyyMMdd)]`。
    - 注意 as 后面的别名一定要是 **expected_value**，否则统计会出错。
    - 表名可以用`${table2}`，系统会自动替换，也可以直接写正确的表名。
```
select count(1) as expected_value from ${table2} where data_date='$[yesterday]'
```
- 配置结果判断公式
    - 结果公式选择：实际值-期望值
    - 比较符选择：>=
    - 阈值：0

如果公式`实际值-期望值 >= 0`的结果为真, 那么就证明今天的表行数大于昨天的表行数，否则就证明今天的表行数小于昨天的表行数，结果是异常的，需要告警。
