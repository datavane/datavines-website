---
id: 'local-mode'
title: '本地运行模式'
---

## 创建规则配置文件

```
cd datavines-1.0.0-SNAPSHOT-bin/bin
vi metric_job_config.json
```

## 添加以下内容到配置文件中

```
{
  "languageEn":true,
  "name":"test",
  "executePlatformType":"client",
  "parameter":{
    "connectorParameter":{
      "type":"mysql",
      "parameters":{
        "database":"test",
        "password":"123456",
        "port":"3306",
        "host":"localhost",
        "user":"root",
        "properties":"useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=Asia/Shanghai"
      }
    },
    "metricParameterList":[
      {
        "metricType":"column_duplicate",
        "metricParameter":{
          "table":"test_table",
          "column":"test_column",
          "database":"test"
        },

        "expectedType":"fix_value",
        "expectedParameter":{
          "expected_value":"10"
        },
        "resultFormula":"count",
        "operator":"lt",
        "threshold":5.0
      }
    ]
  },
  "errorDataStorageType": "file",
  "errorDataStorageParameter": {
    "data_dir":"/tmp/datavines/error-data",
    "column_separator":","
  },
  "validateResultDataStorageType": "file",
  "validateResultDataStorageParameter":{
    "data_dir":"/tmp/datavines/validate-result-data",
    "column_separator":","
  },
  "notificationParameters": [
    {
      "type":"email",
      "config": {
        "serverHost":"smtp.qq.com",
        "serverPort":"25",
        "sender":"1234567@qq.com", // input your mail
        "enableSmtpAuth":"true",
        "user":"123456@qq.com", // input your username
        "passwd":"123456", // input your passwd
        "starttlsEnable":"false",
        "sslEnable":"false",
        "smtpSslTrust":"true"
      },
      "receiver": {
        "to":"12345566@qq.com" // input receiver email
      }
    }
  ]
}

```

## 以脚本形式执行数据质量检查作业

```
./datavines-submit.sh metric_job_config.json
```


