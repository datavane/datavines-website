---
id: 'expected-value-daily-avg'
title: '日均值'
---

## 概念解释
`日均值` 期望值类型表示在数据质量检查过程中使用的期望值是根据今日运行该规则得到的实际值所计算得出的当日的均值。

## 使用方法
- 点击创建规则作业，选择数据质量作业
- 在期望值中选择 `日均值`。

## 计算方式
- 相关参数
    - uniqueKey：会根据每个规则的配置信息生成一个唯一键值,为8位长度的字符串
    - unique_code：会根据每个规则的独有的配置信息生成一个唯一编码

- `Local` 引擎
```
select round(avg(actual_value),2) as expected_value_${uniqueKey}
from dv_actual_values 
where data_time >=date_format(${data_time},'%Y-%m-%d') 
      and data_time < date_add(date_format(${data_time},'%Y-%m-%d'), interval 1 DAY) 
      and unique_code = ${unique_code}
``` 

- `Spark`&`Livy` 引擎
```
select round(avg(actual_value),2) as expected_value_${uniqueKey}
from dv_actual_values 
where data_time >=date_format(${data_time}, 'yyyy-MM-dd')
      and data_time < date_add(date_format(${data_time}, 'yyyy-MM-dd'),1) 
      and unique_code = ${unique_code}
``` 