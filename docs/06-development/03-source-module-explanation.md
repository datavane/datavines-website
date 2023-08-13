---
id: 'source-module-explanation'
title: 'Source Module Explanation'
---
# Datavines Code Architecture Analysis

This article gives a detailed introduction to each core module in Datavines

## datavines-server

datavines-server is the core module of datavines. Its core functions include providing API interface externally, data management of the whole system, metadata acquisition and management of data sources, management, scheduling and execution of data quality rules. It is a decentralized design, supports horizontal expansion to improve performance, and supports fault-tolerant processing of various jobs.

## datavines-spi

datavines-spi is the SPI module in datavines. Its main function is to design the SPI interface and PluginLoader. PluginLoader is responsible for scanning the plugins with @SPI and loading the specific plugins into the system.

## datavines-connector

datavines-connector is the data source module in datavines. datavines-connector-api defines various interfaces of data sources. For example, Connector interface defines various metadata-related interfaces of data sources, and Executor interface defines data sources. The interface related to data query, the interface related to the dialect of the data source is defined in the Dialect interface. datavines-connector-plugins is the specific implementation of various data sources, and the built-in data sources include MySQL, Doris, Starrocks, Trino, Presto and other 10 data sources.

## datavines-metric

datavines-metric is a rule module in datavines, and datavines-metric-api defines the interfaces of rules, expected values, and result calculation formulas. The SqlMetric interface mainly defines the type of rules, actual value calculation logic and other related methods. The ExpectedValue interface mainly defines the calculation logic related methods of the expected value. The ResultFormula interface mainly defines methods related to the calculation logic of the check formula.

## datavines-engine

datavines-engine is the job execution engine module in datavines. datavines-engine-api defines the engine-related interfaces, and the Execution interface mainly defines the related methods of job execution. The execute method mainly executes the reading of the source, transforms the data, and finally sinks the data to the destination. The datavines-engine-config module mainly defines the construction logic and related methods of job configuration files. The datavines-engine-executor module defines the logic related to the job executor

## datavines-registry

datavines-registry is the registry in datavines. datavines-registry-api defines interfaces such as acquiring locks, releasing locks, acquiring current active nodes, and notifying nodes when they go offline. There are three types of registries built into datavines-registry-plugins, including MySQL, PostgreSQL, and ZooKeeper.

## datavines-notification

datavines-notification is the notification channel management in datavines. datavines-notification-api defines the notification channel's message notification, configuration parameters and other interfaces. The email type notification channel implementation is built into datavines-notification-plugins.

## datavines-storage

datavines-storage is an error data storage management module in datavines. datavines-storage-api defines interfaces such as error data query and configuration parameters. Two types of error data storage engines, MySQL and LocalFile, are built into datavienes-storage-plugins, which are used for error data that does not conform to the rules found during the data quality inspection process. The LocalFile engine is only applicable to the Local execution engine.

## datavines-runner

datavines-runner is a module in datavines responsible for running data quality checks in script mode. Its main functions are to read configuration files, parse configuration files, perform data quality checks, judge check results, and run alarm processing.
