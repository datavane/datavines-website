---
id: 'formula-diff-percentage'
title: '|实际值-期望值|/期望值*100%'
---

## 概念解释
`|实际值-期望值|/期望值*100%` 比对公式表示在进行结果判断时所使用的是实际值和期望值的差值的绝对值除以期望值的百分比。

## 使用方法
- 点击创建规则作业，选择数据质量作业
- 在比对公式中选择 `|实际值-期望值|/期望值*100%` 

## 计算公式

```
@Override
public Double getResult(Double actualValue, Double expectedValue) {
    double result = 0;
    if (expectedValue > 0) {
        result = Math.abs(expectedValue - actualValue) / expectedValue * 100;
    }

    return result;
}
```
