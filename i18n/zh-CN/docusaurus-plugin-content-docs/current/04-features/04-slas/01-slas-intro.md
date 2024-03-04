---
id: 'slas-intro'
title: 'SLAs介绍'
---
SLA 是系统的核心功能，也是通知用户的通道。用户可以给每个规则配置多个SLA来通知不同的用户群，一个SLA也可以给多个规则检查作业使用，目前系统只支持邮件。
### 配置 SLA
- 在sla中创建sla，
  ![创建sla](/doc/image/create_slas.png)
- 在通知里面创建一个通道
  ![创建通知](/doc/image/create_notify.png)
- 进去sla后，在sla中创建个通知关联上这个通道
  ![sla关联通知](/doc/image/slas_add_notify.png)
### SLA 使用
创建数据质量检查作业时可以在配置页面选择SLA，当检查结果为失败时会通过该SLA里面所配置的告警通道进行告警