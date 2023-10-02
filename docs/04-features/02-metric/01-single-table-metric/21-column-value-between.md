---
id: 'column-value-between'
title: 'column_value_between'
---
## 使用方法
- 点击创建规则作业，选择数据质量作业
- 进入作业页面选择 值范围检查 规则
- 选择要检查的数据源信息

## 参数介绍
### Options

|             name             |  type  |  required  | default value |
|:----------------------------:|:------:|:----------:|:-------------:|
| [database](#database-string) | string |    yes     |       -       |
|    [table](#table-string)    | string |    yes     |       -       |
|   [column](#column-string)   | string |    yes     |       -       |
|   [min](#min-number)   | number |    yes     |       -       |
|   [max](#max-number)   | number |    yes     |       -       |

#### database [string]
源表数据库名
#### table [string]
源表数据库中的表名
#### column [string]
要检查的列
#### min [number]
最小值
#### max [number]
最大值

### 配置文件例子
```
{
    "metricType": "column_avg",
    "metricParameter": {
        "database": "datavines",
        "table": "dv_catalog_entity_instance",
        "column": "type",
        "min":"0",
        "max":"10"
    }
}
```

### 检查过程中自动生成的 `SQL` 语句

检查过程会用到的一些自动生成的参数，用于区分各个检查规则。
- uniqueKey
    - 会根据每个规则的配置信息生成一个唯一键值
- invalidate_items_table
    - 会创建一个视图用于存储中间表数据，中间表数据一般为命中规则的数据，即为错误数据，该视图的名字生成规则为 invalidate_items_${uniqueKey}

中间表 invalidate_items_${uniqueKey}
```
select ${column} from ${table} where ${column} >= ${min} and ${column} <= ${max} and ${filter}
```
计算实际值的 `SQL`，输出的实际值是 `列值的重复数=1` 的列的行数
```
select count(1) as actual_value_"+ uniqueKey +" from ${invalidate_items_table}
```
## 使用案例

### 场景
...

### 思路
...

### 步骤
...