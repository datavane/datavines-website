---
id: 'quick-start'
title: '快速上手'
---

## 创建数据源

点击`创建数据源`按钮，输入数据源的名称，然后选择数据源类型。以`mysql`为例，输入`mysql`的连接信息，点击`测试连接`按钮。如果成功，请单击`保存` 
![alert_add_setting.png](/doc/image/create_datasource.png)

## 查看数据源信息

点击已创建好的数据源，进入数据源详情页面 
![alert_add_setting.png](/doc/image/database_page.png)

## 选择列
例如，点击表`dv_catalog_entity_instance`的`properties`列，进入列的详情页面 
![alert_add_setting.png](/doc/image/column_page.png)

## 添加规则
点击 `添加规则` 按钮, 选择`空值检查`规则, 选择 `固定值` 期望值类型、输入期望值 `10` , 选择 `实际值` 检查公式 、`>` 比较符并输入阈值 `10`, 这样选择的意思就是当实际值 > 10 ,那么检查结果为成功，否则是失败。配置完成以后可以直接`保存`进行保存或者点击`保存并运行`来执行检查作业。
![alert_add_setting.png](/doc/image/create_metric.png)


返回到列的详情页面，你可以看到你刚刚所创建的规则作业列表。你可以在这里看到这个检查作业的运行趋势图。
![alert_add_setting.png](/doc/image/metric_list.png)

## 查看规则作业的信息
点击规则名则可以进入到规则作业的详情页面。
![alert_add_setting.png](/doc/image/metric_dashboard.png)

点击 `运行结果` 页面, 你可以看到执行历史列表。
![alert_add_setting.png](/doc/image/metric_runs.png)

点击`日志`按钮，你可以看到规则执行的日志信息。
![alert_add_setting.png](/doc/image/metric_job_log.png)

点击`检查结果`按钮，你可以看到规则执行的检查结果。
![alert_add_setting.png](/doc/image/metric_execute_result.png)

点击`错误数据`按钮，你可以看到规则执行的错误数据。
![alert_add_setting.png](/doc/image/error_data.png)






