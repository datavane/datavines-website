---
id: 'formula-count'
title: '实际值'
---

## 概念解释
`实际值` 比对公式表示在进行结果判断时所使用的是实际值和期望值的差的绝对值。

## 使用方法
- 点击创建规则作业，选择数据质量作业
- 在比对公式中选择 `实际值` 

## 计算公式

```
@Override
public Double getResult(Double actualValue, Double expectedValue) {
    return actualValue;
}
```
