---
id: 'column-not-null'
title: '非空檢查'
---
## 使用方法
- 点击创建规则作业，选择数据质量作业
- 进入作业页面选择 非空检查 规则
- 选择要检查的数据源信息

![自定义聚合SQL规则](/doc/image/metric_column_not_null.png)

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
    "metricType": "column_not_null",
    "metricParameter": {
        "database": "datavines",
        "table": "dv_catalog_entity_instance",
        "column": "type"
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