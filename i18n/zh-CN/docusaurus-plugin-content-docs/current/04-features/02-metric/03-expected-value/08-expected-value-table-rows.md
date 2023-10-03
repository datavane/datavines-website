---
id: 'expected-value-table-rows'
title: '表总行数'
---

## 概念解释
`表总行数` 期望值类型表示在数据质量检查过程中使用的期望值是计算检查的表的总行数。

## 使用方法
- 点击创建规则作业，选择数据质量作业
- 在期望值中选择 `表总行数`。

## 计算方式
- 相关参数
    - uniqueKey：会根据每个规则的配置信息生成一个唯一键值,为8位长度的字符串

- `Local`&`Spark`&`Livy` 引擎
```
select count(1) as expected_value_${uniqueKey} from ${table}
``` 