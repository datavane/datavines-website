---
id: 'expected-value-weekly-avg'
title: '期望值-周均值'
---

## 概念解释
`周均值` 期望值类型表示在数据质量检查过程中使用的期望值是根据本周运行该规则得到的实际值所计算得出的当周的均值。

## 使用方法
- 点击创建规则作业，选择数据质量作业
- 在期望值中选择 `周均值`。

## 计算方式
- 相关参数
    - uniqueKey：会根据每个规则的配置信息生成一个唯一键值,为8位长度的字符串
    - unique_code：会根据每个规则的独有的配置信息生成一个唯一编码

- `Local` 引擎
```
select round(avg(actual_value),2) as expected_value_${uniqueKey}
from dv_actual_values 
where data_time >= date_sub(${data_time},interval weekday(${data_time}) + 0 day)
      and data_time < date_add(date_format(${data_time},'%Y-%m-%d'),interval 1 DAY) 
      and unique_code = ${unique_code}
``` 

- `Spark`&`Livy` 引擎
```
select round(avg(actual_value),2) as expected_value_${uniqueKey}
from dv_actual_values 
where data_time >= date_sub(date_format(${data_time},'yyyy-MM-dd'), (7- datediff(next_day(date_format(${data_time}, 'yyyy-MM-dd'),'Sunday'),date_format(${data_time}, 'yyyy-MM-dd')))-1)
      and data_time < date_add(date_format(${data_time}, 'yyyy-MM-dd'),1) 
      and unique_code = ${unique_code}
``` 

## 使用案例

### 场景
...

### 思路
...

### 步骤
...