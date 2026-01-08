---
id: 'intro'
title: 'Introduction'
---

# Introduction

Know your data easier!

DataVines is an easy-to-use data observability service platform that provides comprehensive data quality management capabilities. As a core component of DataOps, it ensures data accuracy during integration and processing, helping users fully understand and manage their data assets.

## Project Background

With the development of big data technology, data quality has become a critical issue in enterprise digital transformation. Low-quality data can lead to poor decision-making, business losses, and decreased customer trust. Traditional data quality management tools often have limited functionality and poor extensibility, making it difficult to meet modern enterprises' high requirements for data quality.

DataVines was created to address these challenges by providing a comprehensive, flexible, and easy-to-use data quality service platform.

## Design Goals

DataVines' design goals include:

- **Ease of Use**: Provides an intuitive web interface for easy configuration and management of data quality check tasks
- **Flexibility**: Supports multiple data sources and execution engines, allowing users to choose appropriate configurations based on their needs
- **Extensibility**: Adopts microkernel architecture and SPI plugin mechanism for convenient custom function extensions
- **High Availability**: Supports horizontal scaling and automatic failover to ensure system stability and reliability
- **High Performance**: Optimizes data processing workflows to improve data quality checking efficiency

## Core Features

### Data Catalog

DataVines' data catalog feature periodically retrieves metadata from data sources to build a data catalog and monitor metadata changes. Users can classify and tag metadata through the tag management feature for easy data discovery and management.

- **Periodic metadata retrieval** from data sources to build data catalog
- **Metadata change monitoring** to track schema evolution
- **Tag management support** for metadata classification and annotation

### Data Quality

DataVines has 27 built-in data quality check rules, supporting 4 types of data quality checks including single-table column checks, custom SQL checks, cross-table accuracy checks, and two-table value comparison checks. Users can set up scheduled tasks for data quality checks and configure SLA (Service Level Agreement) alerts for check results.

- **27 built-in data quality check rules**
- **4 types of data quality check rules:**
  - Single-table column checks
  - Single-table custom SQL checks
  - Cross-table accuracy checks
  - Two-table value comparison checks
- **Scheduled task support** for periodic data quality checks
- **SLA support** for alerting on check results

### Data Profile

DataVines supports scheduled data profiling execution to generate data profile reports. The platform can automatically identify column types and match corresponding data profile metrics, supporting table row count trend monitoring and data distribution views.

- **Scheduled data profiling** to generate comprehensive reports
- **Automatic column type identification** to match appropriate metrics
- **Table row count trend monitoring**
- **Data distribution view support**

### Plugin Design

DataVines is based on plugin design, with multiple modules supporting user-defined plugin extensions, including data sources, check rules, job execution engines, alert channels, error data storage, and registry centers.

- **Data Sources**: Supports MySQL, Impala, StarRocks, Doris, Presto, Trino, ClickHouse, PostgreSQL, and more
- **Check Rules**: 27 built-in rules including null check, not null check, enumeration check, etc.
- **Job Execution Engines**: Supports Spark and Local execution engines. Spark engine currently only supports Spark 2.4, while Local engine is JDBC-based and requires no additional engine dependencies
- **Alert Channels**: Supports Email, DingTalk, WeChat Work, Lark
- **Error Data Storage**: Supports MySQL and local files (Local engine only)
- **Registry**: Supports MySQL, PostgreSQL, and ZooKeeper

### Multiple Execution Modes

DataVines provides a web interface for configuring check jobs, running jobs, viewing job execution logs, error data, and check results. It also supports online script generation, allowing job submission through `datavines-submit.sh` for integration with scheduling systems.

- **Web interface** for configuration and management of check tasks
- **Online job script generation** for submission via `datavines-submit.sh`
- **Integration with scheduling systems**

### Easy Deployment & High Availability

DataVines has minimal dependencies and is easy to deploy. The minimum deployment only requires MySQL to start the project and complete data quality checking operations. It supports horizontal scaling and automatic failover to ensure tasks are neither lost nor duplicated.

- **Minimal dependencies** for easy deployment
- **Minimum deployment requires only MySQL**
- **Horizontal scaling support** with automatic failover
- **Decentralized design** with Server nodes supporting horizontal expansion for performance improvement
- **Automatic task failover** ensuring no task loss or duplication

## Technical Advantages

### Microkernel Architecture

DataVines adopts a microkernel architecture pattern, dividing the system into core kernel and extensible plugins. The core kernel handles basic services, task scheduling, and lifecycle management, while specific functions like data source connections, execution engines, quality metrics, and notification methods are implemented as plugins.

Key benefits:
- Easy to add new data source support without modifying core code
- Plugins can be independently developed and tested
- Selective plugin deployment based on needs

### SPI Plugin Mechanism

The SPI (Service Provider Interface) mechanism enables dynamic plugin discovery and loading. Through the `@SPI` annotation and `PluginLoader` class, the system can:
- Automatically discover and load plugins at runtime
- Cache loaded plugins for performance
- Support both singleton and new instance creation patterns

### Rich Technology Stack

**Backend:**
- Spring Boot for rapid development and deployment
- MyBatis-Plus for simplified database operations
- HikariCP for high-performance connection pooling
- Quartz for task scheduling

**Frontend:**
- React for building user interfaces
- Ant Design for rich UI components
- Redux for state management
- Webpack for build optimization

## Use Cases

### Enterprise Data Governance

DataVines is suitable for enterprise data governance, helping organizations ensure data accuracy during data integration and processing. Through data catalog, data quality checks, and data profiling features, enterprises can comprehensively understand and manage data assets, improving overall data quality.

### Data Warehouse Construction

In data warehouse construction, DataVines serves as a data quality checking tool to ensure data in the warehouse meets expected standards. Through scheduled tasks and SLA alerts, organizations can promptly discover and resolve data quality issues.

### Data Lake Management

DataVines supports multiple data sources, making it suitable for data lake management. Through plugin design, new data sources can be easily integrated to ensure data quality in the data lake.

### Real-time Data Processing

DataVines supports real-time computing engines like Spark and Flink, making it suitable for real-time data processing scenarios. Through real-time data quality checks, organizations can ensure the accuracy and consistency of real-time data.

## Comparison with Other Tools

| Feature | DataVines | Other Tool A | Other Tool B |
|---------|-----------|--------------|-------------|
| **Ease of Use** | Intuitive web interface, easy configuration | Complex interface, high learning curve | Simple interface but limited features |
| **Flexibility** | Multiple data sources and engines, plugin design | Fixed data sources, poor extensibility | Partial data source support, average extensibility |
| **Extensibility** | Microkernel architecture, SPI plugin mechanism | No plugin mechanism, difficult to extend | Simple plugin mechanism, limited extensibility |
| **High Availability** | Horizontal scaling and automatic failover | Single point of failure, low reliability | Cluster support but imperfect failover |
| **Performance** | Optimized processing workflows | Slow processing, high resource consumption | Fast processing but high resource usage |

## Getting Started

To get started with DataVines:

1. **Environment Requirements**: JDK 8, Maven 3.6.1+, MySQL or PostgreSQL
2. **Build**: `mvn clean package -Prelease -DskipTests`
3. **Deploy**: Minimal deployment only requires MySQL
4. **Configure**: Set up data sources through web interface
5. **Run**: Create and execute quality check jobs

For detailed deployment instructions, please refer to our [Quick Start Guide](./03-user-guide/01-quickstart.md).

## Community and Support

DataVines is an open-source project welcoming contributions from the community. You can:

- Submit [Pull Requests](https://github.com/datavane/datavines/pulls) for code contributions
- Report [Issues](https://github.com/datavane/datavines/issues) for bugs and feature requests
- Join our community discussions
- Contribute to documentation improvements

For more information about contributing, please see our [Development Guide](./06-development/02-environment-preparation.md).
