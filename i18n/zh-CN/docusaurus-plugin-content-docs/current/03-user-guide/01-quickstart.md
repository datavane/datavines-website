--
id: 'quick-start'
title: '快速上手'
---

# 快速上手指南

本指南将帮助您在本地环境中快速部署和运行 DataVines，从安装到创建第一个数据质量检查的完整流程。

## 环境准备

在开始之前，请确保您的系统满足以下要求：

### 必需软件

- **Java**：JDK 8 或更高版本
- **数据库**：MySQL 5.7+ 或 PostgreSQL 9.6+
- **Maven**：Maven 3.6.1 或更高版本（用于源码构建）

### 可选软件

- **Spark**：如果使用 Spark 执行引擎（支持 Spark 2.4+）
- **Docker**：用于容器化部署

## 安装部署

### 方式一：源码构建

1. **克隆代码仓库**：
```bash
git clone https://github.com/datavane/datavines.git
cd datavines
```

2. **构建项目**：
```bash
mvn clean package -Prelease -DskipTests
```

3. **解压安装包**：
```bash
cd datavines-dist/target
tar -zxvf datavines-*.tar.gz
cd datavines-*
```

### 方式二：Docker 部署

1. **构建 Docker 镜像**：
```bash
docker build -t datavines:latest -f deploy/docker/Dockerfile .
```

2. **使用 Docker Compose 启动**：
```bash
docker-compose -f deploy/compose/docker-compose.yaml up -d
```

## 数据库初始化

### MySQL 配置

1. **创建数据库**：
```sql
CREATE DATABASE datavines DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. **初始化表结构**：
```bash
mysql -u root -p datavines < scripts/sql/datavines-mysql.sql
```

### PostgreSQL 配置

1. **创建数据库**：
```sql
CREATE DATABASE datavines;
```

2. **初始化表结构**：
```bash
psql -U postgres -d datavines -f scripts/sql/datavines-postgresql.sql
```

## 配置文件

编辑配置文件 `conf/application.yaml`：

### MySQL 配置示例

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

### PostgreSQL 配置示例

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

## 启动服务

### Linux/Unix 系统

```bash
# 添加执行权限
chmod +x bin/*.sh

# 使用 MySQL 配置启动服务
bin/datavines-daemon.sh start mysql

# 使用 PostgreSQL 配置启动服务
bin/datavines-daemon.sh start postgresql

# 查看服务状态
bin/datavines-daemon.sh status

# 停止服务
bin/datavines-daemon.sh stop
```

### Windows 系统

使用 Git Bash 或 WSL 运行 shell 脚本：

```bash
bash bin/datavines-daemon.sh start mysql
```

### 验证安装

服务启动后，验证是否正常运行：

1. **检查进程**：
```bash
ps aux | grep datavines
```

2. **检查端口**：
```bash
netstat -an | grep 5600
```

3. **访问 Web 界面**：
浏览器访问：`http://localhost:5600`

默认登录凭据：
- 用户名：`admin`
- 密码：`admin123`

## 快速教程

### 步骤 1：创建数据源

1. 进入**数据源**页面
2. 点击**创建数据源**按钮
3. 填写数据源信息：
   - **名称**：test_mysql
   - **类型**：MySQL
   - **主机**：127.0.0.1
   - **端口**：3306
   - **数据库**：your_database
   - **用户名**：your_username
   - **密码**：your_password
4. 点击**测试连接**进行验证
5. 测试成功后点击**保存**

![创建数据源](/doc/image/create_datasource.png)

### 步骤 2：查看数据目录

1. 点击已创建的数据源
2. DataVines 会自动获取元数据
3. 浏览数据库、表和列信息
4. 查看表统计信息和列详情

![数据库页面](/doc/image/database_page.png)

### 步骤 3：创建数据质量检查

1. 进入某个具体的列（例如 `dv_catalog_entity_instance.properties`）
2. 点击**添加规则**按钮
3. 配置质量检查规则：
   - **规则类型**：选择 `column_not_null`（检查非空）
   - **期望值类型**：选择 `固定值`
   - **期望值**：输入 `0`（期望0个空值）
   - **检查公式**：选择 `实际值`
   - **比较符**：选择 `>`
   - **阈值**：输入 `10`
4. 点击**保存并运行**立即执行，或点击**保存**稍后调度执行

![创建规则](/doc/image/create_metric.png)

### 步骤 4：查看检查结果

返回列详情页面可以看到：

1. **规则列表**：该列配置的所有检查规则
2. **结果仪表板**：检查结果的可视化展示
3. **趋势分析**：历史数据质量趋势

![规则列表](/doc/image/metric_list.png)

### 步骤 5：探索规则详情

点击规则名称查看：

- **仪表板**：关键指标和图表概览
- **运行结果**：执行历史记录和状态
- **日志**：详细的执行日志用于调试
- **结果**：实际值与期望值的对比
- **错误数据**：未通过质量检查的样本记录

![规则仪表板](/doc/image/metric_dashboard.png)

#### 查看执行历史

点击**运行结果**标签页：
![运行结果](/doc/image/metric_runs.png)

#### 查看执行日志

点击**日志**按钮查看详细的执行日志：
![执行日志](/doc/image/metric_job_log.png)

#### 查看执行结果

点击**检查结果**按钮：
![检查结果](/doc/image/metric_execute_result.png)

#### 查看错误数据

点击**错误数据**按钮查看未通过检查的样本记录：
![错误数据](/doc/image/error_data.png)

## 高级功能

### 配置定时检查

1. 在规则配置中设置**调度**：
   - **Cron 表达式**：`0 0 8 * * ?`（每天上午8点执行）
   - **开始时间**：指定调度开始时间
   - **结束时间**：可选的调度结束时间

### 配置 SLA 告警

1. 进入 **SLA** 配置页面
2. 点击**创建 SLA**
3. 配置告警条件：
   - **触发条件**：检查失败时触发
   - **通知渠道**：邮件、钉钉、飞书或企业微信
   - **接收人**：输入邮箱地址或 Webhook URL
   - **消息模板**：自定义告警消息

### 使用多种执行引擎

DataVines 支持不同的执行引擎：

- **Local 引擎**：基于 JDBC，无需额外依赖
- **Spark 引擎**：用于大规模数据处理
- **Flink 引擎**：用于流式数据质量检查

在规则设置中的**引擎类型**进行配置。

## 问题排查

### 服务无法启动

**症状**：服务启动失败或立即崩溃

**解决方案**：
1. 检查 Java 版本：`java -version`（必须是 8+）
2. 验证 JAVA_HOME 设置：`echo $JAVA_HOME`
3. 检查数据库连接
4. 查看日志：`logs/datavines-server-*.out`
5. 确保端口 5600 未被占用：`netstat -an | grep 5600`

### 数据库连接失败

**症状**："无法连接到数据库"错误

**解决方案**：
1. 验证数据库是否运行
2. 检查 `application.yaml` 中的连接参数
3. 确保数据库用户有必要的权限
4. 手动测试连接：
   ```bash
   mysql -h 127.0.0.1 -P 3306 -u root -p
   ```
5. 检查防火墙规则

### 规则执行失败

**症状**：规则运行但显示"失败"状态

**解决方案**：
1. 检查执行日志查看错误消息
2. 验证数据源连接是否仍然有效
3. 在数据库中手动测试 SQL 查询
4. 确保列名/表名正确
5. 检查执行引擎配置

### 端口被占用

**症状**："Address already in use: bind" 错误

**解决方案**：
1. 查找占用端口 5600 的进程：
   ```bash
   lsof -i :5600  # Linux/Mac
   netstat -ano | findstr :5600  # Windows
   ```
2. 终止该进程或在 `application.yaml` 中更改端口：
   ```yaml
   server:
     port: 5601
   ```

## 下一步

现在 DataVines 已经运行，您可以：

1. **探索数据目录**：浏览数据资产并添加标签
2. **创建更多检查**：尝试不同的规则类型（唯一性、范围、正则等）
3. **设置监控**：配置定时检查和 SLA 告警
4. **查看数据画像**：生成数据概览报告
5. **集成工作流**：使用 DataVines API 或命令行工具

## 更多资源

- [架构设计](../06-development/01-architeture-design.md)：了解 DataVines 架构
- [数据质量指标](../04-features/02-metric/00-metric-intro.md)：学习可用的检查规则
- [连接器指南](../04-features/01-catalog/02-connector/)：配置不同的数据源
- [引擎配置](../04-features/03-engine/)：设置 Spark 或 Flink 引擎
- [API 文档](../05-integration/)：将 DataVines 集成到您的系统






