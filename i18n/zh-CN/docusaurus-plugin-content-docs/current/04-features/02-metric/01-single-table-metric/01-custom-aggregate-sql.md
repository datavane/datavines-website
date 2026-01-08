---
id: 'custom-aggregate-sql'
title: '自定义聚合SQL检查'
sidebar_position: 1
---

# 自定义聚合SQL检查

## 概述

`custom_aggregate_sql` 检查规则允许用户编写自定义的 SQL 语句来实现复杂的数据质量检查。这是最灵活的检查规则,适用于标准检查规则无法满足的复杂业务场景。

## 业务场景

该检查规则适用于以下场景:

- **复杂业务逻辑验证**:涉及多个字段、复杂计算逻辑的检查
- **自定义统计指标**:计算业务特有的统计指标
- **条件聚合检查**:在特定条件下进行聚合计算
- **多维度分析**:结合多个维度进行数据质量分析
- **特殊业务规则**:实现业务特有的数据质量验证逻辑

## 配置参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| 数据库 | String | 是 | 目标数据库名称 |
| 表 | String | 是 | 目标表名称 |
| SQL | String | 是 | 自定义SQL语句(必须返回数值结果) |
| 过滤条件 | String | 否 | 过滤条件(应用于整个SQL) |

## SQL编写要求

### 基本要求

1. **必须返回单一数值**:SQL语句必须使用聚合函数(COUNT、SUM、AVG等)并返回单一数值结果
2. **不能有子查询在SELECT中**:不要在SELECT子句中使用子查询
3. **使用表别名**:建议使用表别名以提高可读性
4. **避免使用通配符**:使用具体的列名而不是 `SELECT *`

### 支持的聚合函数

- `COUNT(*)` / `COUNT(column)`:计数
- `SUM(column)`:求和
- `AVG(column)`:求平均值
- `MAX(column)`:求最大值
- `MIN(column)`:求最小值
- `COUNT(DISTINCT column)`:去重计数

### 变量替换

DataVines 支持在SQL中使用以下变量进行替换:

- `${table}`:自动替换为配置的表名
- `${database}`:自动替换为配置的数据库名
- `${filter}`:自动替换为配置的过滤条件

## SQL示例

### 示例1:计算订单金额异常数量

```sql
SELECT COUNT(*) 
FROM ${table} 
WHERE amount < 0 OR amount > 1000000
```

**说明**:统计金额小于0或大于100万的订单数量。

### 示例2:计算订单重复率

```sql
SELECT COUNT(*) - COUNT(DISTINCT order_no) 
FROM ${table}
WHERE ${filter}
```

**说明**:计算订单号重复的数量。

### 示例3:计算用户年龄分布异常

```sql
SELECT COUNT(*) 
FROM ${table} 
WHERE age < 0 OR age > 150 OR age IS NULL
```

**说明**:统计年龄小于0、大于150或为空的用户数量。

### 示例4:计算数据延迟数量

```sql
SELECT COUNT(*) 
FROM ${table} 
WHERE DATEDIFF(CURRENT_DATE, update_time) > 7
```

**说明**:统计超过7天未更新的记录数量。

### 示例5:计算特定状态占比

```sql
SELECT COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) * 100.0 / COUNT(*) 
FROM ${table}
WHERE ${filter}
```

**说明**:计算状态为'COMPLETED'的订单占比。

## 期望值

可以配置期望值来判断检查是否通过:

- **固定值**:结果必须等于某个值(如异常数量=0)
- **范围值**:结果必须在某个范围内(如0到100之间)
- **阈值**:结果不能超过某个阈值(如异常数量≤10)
- **同比前一天**:与前一天的结果进行比较,检测异常
- **同比去年同期**:与去年同期的结果进行比较

## SLA配置

可以配置 SLA 告警条件,例如:

- 异常数量超过10时告警
- 占比低于95%时告警
- 结果相比前一天增长超过20%时告警
- 结果为0时告警(可能表示数据缺失)

## 最佳实践

### 1. 确保SQL性能

自定义SQL会被定期执行,因此要确保SQL性能良好:
- 添加适当的索引
- 避免全表扫描
- 使用过滤条件减少数据量
- 避免复杂的JOIN操作

### 2. SQL测试验证

在部署检查前,先在数据库客户端中测试SQL:
- 验证SQL语法正确
- 确认返回值类型为数值
- 检查执行时间是否符合要求
- 验证计算逻辑是否正确

### 3. 添加注释

对于复杂的SQL,添加注释以便于维护:

```sql
-- 计算订单异常数量
-- 异常包括:金额为负、金额超过100万、订单号为空
SELECT COUNT(*) 
FROM ${table} 
WHERE (amount < 0 OR amount > 1000000 OR order_no IS NULL)
  AND ${filter}
```

### 4. 合理使用变量

充分利用变量替换功能,提高SQL的复用性:

```sql
-- 不好的做法:硬编码表名
SELECT COUNT(*) FROM order_table WHERE amount < 0

-- 好的做法:使用变量
SELECT COUNT(*) FROM ${table} WHERE amount < 0
```

### 5. 处理NULL值

注意NULL值的处理,使用COALESCE或IS NULL:

```sql
-- 在计算中考虑NULL值
SELECT COUNT(*) 
FROM ${table} 
WHERE COALESCE(status, 'UNKNOWN') NOT IN ('COMPLETED', 'PENDING')
```

### 6. 设置合理的阈值

根据业务需求和数据特点,设置合理的期望值和SLA阈值:
- 对于严格的质量要求,设置阈值为0
- 对于宽松的要求,设置合理的上限
- 定期审查和调整阈值

## 常见场景

### 场景1:数据新鲜度检查

**需求**:检查数据是否每天都有更新

```sql
SELECT COUNT(*) 
FROM ${table} 
WHERE DATE(update_time) = CURRENT_DATE
```

**期望**:数量大于0,否则告警

### 场景2:数据一致性检查

**需求**:检查订单总额是否等于订单明细之和

```sql
SELECT COUNT(*) 
FROM ${table} o
LEFT JOIN (
    SELECT order_id, SUM(price * quantity) as item_total
    FROM order_items
    GROUP BY order_id
) i ON o.id = i.order_id
WHERE ABS(o.total_amount - COALESCE(i.item_total, 0)) > 0.01
```

**期望**:数量等于0,否则告警

### 场景3:数据完整性检查

**需求**:检查关键字段是否完整

```sql
SELECT COUNT(*) 
FROM ${table} 
WHERE user_id IS NULL 
   OR order_no IS NULL 
   OR amount IS NULL
   OR create_time IS NULL
```

**期望**:数量等于0,否则告警

### 场景4:业务规则验证

**需求**:检查订单金额是否符合业务规则

```sql
SELECT COUNT(*) 
FROM ${table} 
WHERE (
    (order_type = 'RETAIL' AND amount < 10) OR
    (order_type = 'WHOLESALE' AND amount < 1000)
)
```

**期望**:数量等于0,否则告警

## 相关检查规则

- [列非空检查](02-column-not-null.md):验证列不包含空值
- [列唯一性检查](20-column-unique.md):验证列值的唯一性
- [列值范围检查](21-column-value-between.md):验证列值在范围内
- [多表准确性检查](../02-multi-table-metric/01-multi-table-accuracy.md):跨表准确性验证

## 调试技巧

### 1. 查看生成的SQL

在检查任务的执行日志中,可以查看实际生成的SQL:

```sql
-- 配置的SQL
SELECT COUNT(*) FROM ${table} WHERE amount < 0

-- 生成的实际SQL
SELECT COUNT(*) FROM ecommerce.orders WHERE amount < 0
```

### 2. 在数据库中测试SQL

将生成的SQL复制到数据库客户端中执行,验证是否正确。

### 3. 检查执行时间

如果SQL执行缓慢,检查执行计划并进行优化:
- 添加适当的索引
- 优化查询条件
- 考虑分区大表

### 4. 验证返回值

确保SQL返回的是单一数值,而不是多行或多列。

## 总结

自定义聚合SQL检查是 DataVines 最灵活的检查规则,适用于各种复杂的业务场景。通过精心设计的SQL,可以实现各种数据质量检查。在使用该检查规则时,要注意SQL的性能、正确性和可维护性,确保数据质量检查的稳定可靠。
