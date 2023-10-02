---
id: 'column-distinct'
title: 'column_distinct'
---
## 使用方法
- 点击创建规则作业，选择数据质量作业
- 进入作业页面选择 Distinct检查 规则
- 选择要检查的数据源信息

## 参数介绍
### Options

|             name             |  type  |  required  | default value |
|:----------------------------:|:------:|:----------:|:-------------:|
| [database](#database-string) | string |    yes     |       -       |
|    [table](#table-string)    | string |    yes     |       -       |
|   [column](#column-string)   | string |    yes     |       -       |

#### database [string]
源表数据库名
#### table [string]
源表数据库中的表名
#### column [string]
要检查的列

### 配置文件例子
```
{
    "metricType": "column_distinct",
    "metricParameter": {
        "database": "datavines",
        "table": "dv_catalog_entity_instance",
        "column": "type"
    }
}
```

### 检查过程中自动生成的 `SQL` 语句

检查过程会用到的一些自动生成的参数，用于区分各个检查规则。
- uniqueKey
    - 会根据每个规则的配置信息生成一个唯一键值

计算实际值的 `SQL`， 输出不重复的行数
```
select count(distinct(${column})) as actual_value_${uniqueKey} from ${table} where ${filter}
```

## 使用案例

### 场景
...

### 思路
...

### 步骤
...