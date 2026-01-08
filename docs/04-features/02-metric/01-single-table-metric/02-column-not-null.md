---
id: 'column-not-null'
title: 'Column Not Null Check'
sidebar_position: 2
---

# Column Not Null Check

## Overview

The `column_not_null` check rule is used to verify that a specified column does not contain null values. This is one of the most commonly used data quality checks to ensure data completeness.

## Business Scenarios

This check rule is applicable in the following scenarios:

- **Required Field Validation**: Ensure that required fields (such as user ID, order number, etc.) are not null
- **Data Integrity Check**: Verify that key business fields are complete
- **ETL Process Validation**: Ensure that data transformation processes don't produce null values
- **Compliance Requirements**: Meet data governance requirements that certain fields must have values

## Configuration Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| Database | String | Yes | Target database name |
| Table | String | Yes | Target table name |
| Column | String | Yes | Column to check |
| Filter | String | No | Filter condition (WHERE clause) |

## Metric Calculation

The check rule calculates the following metrics:

- **Total Count**: Total number of records in the table or filtered result set
- **Not Null Count**: Number of records where the column value is not null
- **Null Count**: Number of records where the column value is null (Total Count - Not Null Count)
- **Not Null Rate**: Percentage of non-null values (Not Null Count / Total Count * 100%)

## Generated SQL

DataVines automatically generates SQL statements based on configuration:

```sql
SELECT 
    COUNT(*) as total_count,
    COUNT(column_name) as not_null_count,
    COUNT(*) - COUNT(column_name) as null_count,
    CASE 
        WHEN COUNT(*) = 0 THEN 0 
        ELSE COUNT(column_name) * 100.0 / COUNT(*) 
    END as not_null_rate
FROM database_name.table_name
WHERE filter_condition;
```

## Expected Values

You can configure expected values to determine if the check passes:

- **Fixed Value**: Not null count must equal a specific value
- **Range**: Not null count must be within a specified range
- **Percentage**: Not null rate must reach a specified percentage (e.g., 100%)
- **Previous Day Comparison**: Compare with previous day's not null count to detect anomalies

## SLA Configuration

Configure SLA alert conditions such as:

- Alert when not null rate is below 95%
- Alert when null count exceeds 100
- Alert when not null rate decreases by more than 5% compared to previous day

## Best Practices

### 1. Prioritize Core Fields

Configure not null checks for business-critical fields first, such as:
- Primary keys and foreign keys
- Required business fields
- Key metric fields

### 2. Use Filter Conditions Reasonably

For specific business scenarios, use filter conditions to narrow the check scope:

```sql
-- Check only orders from the last 7 days
WHERE create_time >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)

-- Check only records in specific status
WHERE status = 'ACTIVE'
```

### 3. Set Reasonable Thresholds

Based on business needs, set appropriate SLA thresholds:
- For strict required fields, set not null rate threshold to 100%
- For optional fields, set appropriate thresholds based on business requirements

### 4. Monitor Trend Changes

Beyond single checks, monitor not null rate trends over time to detect data quality deterioration early.

## Related Check Rules

- [Column Null Check](03-column-null.md): The opposite check - verify that a column contains null values
- [Column Unique Check](20-column-unique.md): Verify column value uniqueness
- [Custom Aggregate SQL](01-custom-aggregate-sql.md): Implement more complex not null checks via custom SQL

## Example

### Scenario Description

Verify that the `user_id` field in the user order table `orders` is not null, ensuring that every order is associated with a user.

### Configuration

- **Database**: `ecommerce`
- **Table**: `orders`
- **Column**: `user_id`
- **Filter**: `create_time >= CURRENT_DATE` (check only today's orders)
- **Expected**: Not null rate = 100%
- **SLA**: Alert when not null rate is below 100%

### Execution Results

```
Total Count: 1000
Not Null Count: 998
Null Count: 2
Not Null Rate: 99.8%
```

### Result Interpretation

The check found 2 orders with null `user_id` values. This violates the expected not null rate of 100%, triggering an SLA alert. The data quality team should investigate:

1. Why do these 2 orders have null user IDs?
2. Are they guest checkout orders?
3. Should the business logic be adjusted to allow guest orders?
4. Or should the order creation process be fixed to ensure user ID is always populated?

## Summary

The Column Not Null check is one of the most fundamental data quality checks, helping ensure data completeness and integrity. Through reasonable configuration and monitoring, data quality issues can be detected and resolved early, ensuring data accuracy and business continuity.