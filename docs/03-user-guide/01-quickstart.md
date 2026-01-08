---
id: 'quick-start'
title: 'Quick Start'
---

# Quick Start Guide

This guide will help you quickly deploy and run DataVines in your local environment, covering everything from installation to creating your first data quality check.

## Prerequisites

Before starting, ensure your system meets the following requirements:

### Required Software

- **Java**: JDK 8 or higher
- **Database**: MySQL 5.7+ or PostgreSQL 9.6+
- **Maven**: Maven 3.6.1 or higher (for building from source)

### Optional Software

- **Spark**: Required if using Spark execution engine (Spark 2.4+ supported)
- **Docker**: For containerized deployment

## Installation

### Option 1: Build from Source

1. **Clone the repository**:
```bash
git clone https://github.com/datavane/datavines.git
cd datavines
```

2. **Build the project**:
```bash
mvn clean package -Prelease -DskipTests
```

3. **Extract the distribution**:
```bash
cd datavines-dist/target
tar -zxvf datavines-*.tar.gz
cd datavines-*
```

### Option 2: Docker Deployment

1. **Build Docker image**:
```bash
docker build -t datavines:latest -f deploy/docker/Dockerfile .
```

2. **Start with Docker Compose**:
```bash
docker-compose -f deploy/compose/docker-compose.yaml up -d
```

## Database Initialization

### MySQL Configuration

1. **Create database**:
```sql
CREATE DATABASE datavines DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. **Initialize schema**:
```bash
mysql -u root -p datavines < scripts/sql/datavines-mysql.sql
```

### PostgreSQL Configuration

1. **Create database**:
```sql
CREATE DATABASE datavines;
```

2. **Initialize schema**:
```bash
psql -U postgres -d datavines -f scripts/sql/datavines-postgresql.sql
```

## Configuration

Edit the configuration file `conf/application.yaml`:

### MySQL Configuration Example

```yaml
spring:
  profiles:
    active: mysql
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://127.0.0.1:3306/datavines?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=Asia/Shanghai
    username: root
    password: your_password

server:
  port: 5600
```

### PostgreSQL Configuration Example

```yaml
spring:
  profiles:
    active: postgresql
  datasource:
    driver-class-name: org.postgresql.Driver
    url: jdbc:postgresql://127.0.0.1:5432/datavines
    username: postgres
    password: your_password

server:
  port: 5600
```

## Start the Server

### Linux/Unix Systems

```bash
# Make scripts executable
chmod +x bin/*.sh

# Start server with MySQL configuration
bin/datavines-daemon.sh start mysql

# Start server with PostgreSQL configuration
bin/datavines-daemon.sh start postgresql

# Check server status
bin/datavines-daemon.sh status

# Stop server
bin/datavines-daemon.sh stop
```

### Windows Systems

Use Git Bash or WSL to run the shell scripts:

```bash
bash bin/datavines-daemon.sh start mysql
```

### Verify Installation

Once started, verify the server is running:

1. **Check process**:
```bash
ps aux | grep datavines
```

2. **Check port**:
```bash
netstat -an | grep 5600
```

3. **Access Web UI**:
Open browser and navigate to: `http://localhost:5600`

Default credentials:
- Username: `admin`
- Password: `admin123`

## Quick Tutorial

### Step 1: Create Data Source

1. Navigate to **Data Source** page
2. Click **Create DataSource** button
3. Enter datasource details:
   - **Name**: test_mysql
   - **Type**: MySQL
   - **Host**: 127.0.0.1
   - **Port**: 3306
   - **Database**: your_database
   - **Username**: your_username
   - **Password**: your_password
4. Click **Test Connection** to verify
5. Click **Save** if test succeeds

![Create DataSource](/doc/image/create_datasource.png)

### Step 2: View Data Catalog

1. Click on the created datasource
2. DataVines will automatically fetch metadata
3. Browse databases, tables, and columns
4. View table statistics and column details

![Database Page](/doc/image/database_page.png)

### Step 3: Create Data Quality Check

1. Navigate to a specific column (e.g., `dv_catalog_entity_instance.properties`)
2. Click **Add Metric** button
3. Configure the quality check:
   - **Metric Type**: Select `column_not_null` (to check for null values)
   - **Expected Value Type**: Select `fixed_value`
   - **Expected Value**: Enter `0` (expect zero null values)
   - **Result Formula**: Select `Actual`
   - **Comparator**: Select `>`
   - **Threshold**: Enter `10`
4. Click **Save and Run** to execute immediately, or **Save** to schedule for later

![Create Metric](/doc/image/create_metric.png)

### Step 4: View Check Results

Return to the column detail page to see:

1. **Metric List**: All configured checks for this column
2. **Result Dashboard**: Visual representation of check results
3. **Trend Analysis**: Historical data quality trends

![Metric List](/doc/image/metric_list.png)

### Step 5: Explore Metric Details

Click on a metric name to view:

- **Dashboard**: Overview with key metrics and charts
- **Runs**: Execution history with timestamps and status
- **Logs**: Detailed execution logs for debugging
- **Results**: Actual vs. expected values comparison
- **Error Data**: Sample records that failed the quality check

![Metric Dashboard](/doc/image/metric_dashboard.png)

#### View Execution History

Click the **Runs** tab:
![Metric Runs](/doc/image/metric_runs.png)

#### View Execution Logs

Click the **Log** button to see detailed execution logs:
![Metric Job Log](/doc/image/metric_job_log.png)

#### View Execution Results

Click the **ExecuteResult** button:
![Metric Execute Result](/doc/image/metric_execute_result.png)

#### View Error Data

Click the **Error** button to see sample records that failed the check:
![Error Data](/doc/image/error_data.png)

## Advanced Features

### Configure Scheduled Checks

1. In the metric configuration, set **Schedule**:
   - **Cron Expression**: `0 0 8 * * ?` (run daily at 8 AM)
   - **Start Time**: Specify when schedule should begin
   - **End Time**: Optional end time for schedule

### Set Up SLA Alerts

1. Navigate to **SLA** configuration
2. Click **Create SLA**
3. Configure alert conditions:
   - **Trigger Condition**: When check fails
   - **Notification Channel**: Email, DingTalk, Lark, or WeChat
   - **Recipients**: Enter email addresses or webhook URLs
   - **Message Template**: Customize alert message

### Use Multiple Execution Engines

DataVines supports different execution engines:

- **Local Engine**: JDBC-based, no additional dependencies
- **Spark Engine**: For large-scale data processing
- **Flink Engine**: For streaming data quality checks

Configure in metric settings under **Engine Type**.

## Troubleshooting

### Server Won't Start

**Symptoms**: Server fails to start or crashes immediately

**Solutions**:
1. Check Java version: `java -version` (must be 8+)
2. Verify JAVA_HOME is set: `echo $JAVA_HOME`
3. Check database connectivity
4. Review logs: `logs/datavines-server-*.out`
5. Ensure port 5600 is not in use: `netstat -an | grep 5600`

### Database Connection Failed

**Symptoms**: "Cannot connect to database" error

**Solutions**:
1. Verify database is running
2. Check connection parameters in `application.yaml`
3. Ensure database user has necessary permissions
4. Test connection manually:
   ```bash
   mysql -h 127.0.0.1 -P 3306 -u root -p
   ```
5. Check firewall rules

### Metric Execution Failed

**Symptoms**: Metric runs but shows "Failed" status

**Solutions**:
1. Check execution logs for error messages
2. Verify datasource connection is still valid
3. Test SQL query manually in database
4. Ensure column/table names are correct
5. Check execution engine configuration

### Port Already in Use

**Symptoms**: "Address already in use: bind" error

**Solutions**:
1. Find process using port 5600:
   ```bash
   lsof -i :5600  # Linux/Mac
   netstat -ano | findstr :5600  # Windows
   ```
2. Kill the process or change port in `application.yaml`:
   ```yaml
   server:
     port: 5601
   ```

## Next Steps

Now that you have DataVines up and running:

1. **Explore Data Catalog**: Browse your data assets and add tags
2. **Create More Checks**: Try different metric types (uniqueness, range, regex, etc.)
3. **Set Up Monitoring**: Configure scheduled checks and SLA alerts
4. **View Data Profile**: Generate data overview reports
5. **Integrate with Workflows**: Use DataVines API or command-line tools

## Additional Resources

- [Architecture Design](../06-development/01-architeture-design.md): Understand DataVines architecture
- [Data Quality Metrics](../04-features/02-metric/00-metric-intro.md): Learn about available check rules
- [Connector Guide](../04-features/01-catalog/02-connector/): Configure different data sources
- [Engine Configuration](../04-features/03-engine/): Set up Spark or Flink engines
- [API Documentation](../05-integration/): Integrate DataVines with your systems






