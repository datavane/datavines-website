---
id: 'custom-aggregate-sql'
title: 'Custom Aggregate SQL Check'
sidebar_position: 1
---

# Custom Aggregate SQL Check

## Overview

The `custom_aggregate_sql` check rule allows users to write custom SQL statements for complex data quality checks. This is the most flexible check rule, suitable for complex business scenarios that cannot be met by standard check rules.

## Business Scenarios

This check rule is applicable in the following scenarios:

- **Complex Business Logic Validation**: Checks involving multiple fields and complex calculation logic
- **Custom Statistical Metrics**: Calculate business-specific statistical indicators
- **Conditional Aggregation Check**: Perform aggregation calculations under specific conditions
- **Multi-Dimensional Analysis**: Combine multiple dimensions for data quality analysis
- **Special Business Rules**: Implement business-specific data quality validation logic

## Configuration Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| Database | String | Yes | Target database name |
| Table | String | Yes | Target table name |
| SQL | String | Yes | Custom SQL statement (must return a numeric result) |
| Filter | String | No | Filter condition (applied to entire SQL) |

## SQL Writing Requirements

### Basic Requirements

1. **Must return a single numeric value**: The SQL statement must use aggregate functions (COUNT, SUM, AVG, etc.) and return a single numeric result
2. **No subqueries in SELECT**: Do not use subqueries in the SELECT clause
3. **Use table aliases**: It's recommended to use table aliases for better readability
4. **Avoid wildcards**: Use specific column names instead of `SELECT *`

### Supported Aggregate Functions

- `COUNT(*)` / `COUNT(column)`: Count number of records
- `SUM(column)`: Calculate sum
- `AVG(column)`: Calculate average
- `MAX(column)`: Get maximum value
- `MIN(column)`: Get minimum value
- `COUNT(DISTINCT column)`: Count distinct values

### Variable Replacement

DataVines supports the following variable replacements in SQL:

- `${table}`: Automatically replaced with configured table name
- `${database}`: Automatically replaced with configured database name
- `${filter}`: Automatically replaced with configured filter condition

## SQL Examples

### Example 1: Calculate Order Amount Anomaly Count

```sql
SELECT COUNT(*) 
FROM ${table} 
WHERE amount < 0 OR amount > 1000000
```

**Explanation**: Count orders with amount less than 0 or greater than 1,000,000.

### Example 2: Calculate Duplicate Order Rate

```sql
SELECT COUNT(*) - COUNT(DISTINCT order_no) 
FROM ${table}
WHERE ${filter}
```

**Explanation**: Calculate the count of duplicate order numbers.

### Example 3: Calculate User Age Distribution Anomaly

```sql
SELECT COUNT(*) 
FROM ${table} 
WHERE age < 0 OR age > 150 OR age IS NULL
```

**Explanation**: Count users with age less than 0, greater than 150, or null.

### Example 4: Calculate Data Delay Count

```sql
SELECT COUNT(*) 
FROM ${table} 
WHERE DATEDIFF(CURRENT_DATE, update_time) > 7
```

**Explanation**: Count records not updated for more than 7 days.

### Example 5: Calculate Specific Status Percentage

```sql
SELECT COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) * 100.0 / COUNT(*) 
FROM ${table}
WHERE ${filter}
```

**Explanation**: Calculate the percentage of orders in 'COMPLETED' status.

## Expected Values

You can configure expected values to determine if the check passes:

- **Fixed Value**: The result must equal a specific value (e.g., anomaly count = 0)
- **Range**: The result must be within a specified range (e.g., 0 to 100)
- **Threshold**: The result must not exceed a threshold (e.g., anomaly count ≤ 10)
- **Previous Day Comparison**: Compare with previous day's result to detect anomalies
- **Same Week Last Year**: Compare with same period last year's result

## SLA Configuration

Configure SLA alert conditions such as:

- Alert when anomaly count exceeds 10
- Alert when percentage is below 95%
- Alert when result increases by more than 20% compared to previous day
- Alert when result is 0 (indicating possible data loss)

## Best Practices

### 1. Ensure SQL Performance

Custom SQL will be executed regularly, so ensure good performance:
- Add appropriate indexes
- Avoid full table scans
- Use filter conditions to reduce data volume
- Avoid complex JOIN operations

### 2. SQL Testing and Validation

Before deploying checks, test SQL in a database client:
- Verify SQL syntax is correct
- Confirm return value type is numeric
- Check execution time meets requirements
- Validate calculation logic is correct

### 3. Add Comments

Add comments to complex SQL for maintenance:

```sql
-- Calculate order anomaly count
-- Anomalies include: negative amount, amount exceeding 1 million, null order number
SELECT COUNT(*) 
FROM ${table} 
WHERE (amount < 0 OR amount > 1000000 OR order_no IS NULL)
  AND ${filter}
```

### 4. Use Variables Wisely

Leverage variable replacement for better SQL reusability:

```sql
-- Bad: Hardcoded table name
SELECT COUNT(*) FROM order_table WHERE amount < 0

-- Good: Use variable
SELECT COUNT(*) FROM ${table} WHERE amount < 0
```

### 5. Handle NULL Values

Pay attention to NULL value handling, use COALESCE or IS NULL:

```sql
-- Consider NULL values in calculation
SELECT COUNT(*) 
FROM ${table} 
WHERE COALESCE(status, 'UNKNOWN') NOT IN ('COMPLETED', 'PENDING')
```

### 6. Set Reasonable Thresholds

Based on business needs and data characteristics, set reasonable expected values and SLA thresholds:
- For strict quality requirements, set threshold to 0
- For lenient requirements, set reasonable upper limits
- Regularly review and adjust thresholds

## Common Scenarios

### Scenario 1: Data Freshness Check

**Requirement**: Check if data is updated daily

```sql
SELECT COUNT(*) 
FROM ${table} 
WHERE DATE(update_time) = CURRENT_DATE
```

**Expected**: Count > 0, otherwise alert

### Scenario 2: Data Consistency Check

**Requirement**: Check if order total equals sum of order items

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

**Expected**: Count = 0, otherwise alert

### Scenario 3: Data Completeness Check

**Requirement**: Check if critical fields are complete

```sql
SELECT COUNT(*) 
FROM ${table} 
WHERE user_id IS NULL 
   OR order_no IS NULL 
   OR amount IS NULL
   OR create_time IS NULL
```

**Expected**: Count = 0, otherwise alert

### Scenario 4: Business Rule Validation

**Requirement**: Check if order amounts meet business rules

```sql
SELECT COUNT(*) 
FROM ${table} 
WHERE (
    (order_type = 'RETAIL' AND amount < 10) OR
    (order_type = 'WHOLESALE' AND amount < 1000)
)
```

**Expected**: Count = 0, otherwise alert

## Related Check Rules

- [Column Not Null Check](02-column-not-null.md): Verify column has no null values
- [Column Unique Check](20-column-unique.md): Verify column value uniqueness
- [Column Value Range Check](21-column-value-between.md): Verify column values are within range
- [Multi-Table Accuracy Check](../02-multi-table-metric/01-multi-table-accuracy.md): Cross-table accuracy validation

## Debugging Tips

### 1. View Generated SQL

In the check task execution log, view the actual generated SQL:

```sql
-- Configuration SQL
SELECT COUNT(*) FROM ${table} WHERE amount < 0

-- Generated actual SQL
SELECT COUNT(*) FROM ecommerce.orders WHERE amount < 0
```

### 2. Test SQL in Database

Copy generated SQL and test in database client to verify correctness.

### 3. Check Execution Time

If SQL executes slowly, check execution plan and optimize:
- Add appropriate indexes
- Optimize query conditions
- Consider partitioning large tables

### 4. Verify Return Values

Ensure SQL returns a single numeric value, not multiple rows or columns.

## Summary

Custom Aggregate SQL check is DataVines' most flexible check rule, suitable for complex business scenarios. Through well-designed SQL, various data quality checks can be implemented. When using this check rule, pay attention to SQL performance, correctness, and maintainability to ensure stable and reliable data quality checks.