---
id: 'quick-start'
title: 'Quick Start'
sidebar_position: 1
---

## Connect DataSource


Click the `Create DataSource` button, enter the name of the datasource, and select the datasource type. Take `mysql` as an example, enter the connection information of mysql, and click to `test connection` button . If successful, click `Save`
![alert_add_setting.png](/doc/image/create_datasource.png)

## View Datasource
Click the datasource that created , enter the datasource profile page

![alert_add_setting.png](/doc/image/database_page.png)

## Select Column
For example, click the column `properties` of table `dv_catalog_entity_instance`, enter the column detail page 
![alert_add_setting.png](/doc/image/column_page.png)

## Add Metric
Click the `Add Metric` button, select metric `column_null`, select expected_value_type `fixed_value`、input the expected_value and threshold `10`, choose `Actual` formula and `>` comparator and input threshold `10`, the check result will be true if actual value > 10, false otherwise.You can click `Save` button to save metric job or `Save and Run` to run the metric job.
![alert_add_setting.png](/doc/image/create_metric.png)


Retrun the column detail page, you can see metric list. You also can view the execute result dashboard in each metric item.
![alert_add_setting.png](/doc/image/metric_list.png)

## View Metric Info
Click the `Metric Name` will enter into metric detail info
![alert_add_setting.png](/doc/image/metric_dashboard.png)

CLick the `Runs` tab, you can view execution list.
![alert_add_setting.png](/doc/image/metric_runs.png)

CLick the `Log` button, you can view log info.
![alert_add_setting.png](/doc/image/metric_job_log.png)

CLick the `ExecuteResult` button, you can view execution result.
![alert_add_setting.png](/doc/image/metric_execute_result.png)

CLick the `Error` button, you can view error data .
![alert_add_setting.png](/doc/image/error_data.png)






