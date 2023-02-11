---
id: 'local-mode'
title: 'Local Mode'
sidebar_position: 2
---

## Create config file

```
cd datavines-1.0.0-SNAPSHOT-bin/bin
vi metric_job_config.json
```

## Add metric config

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
          "metric_database":"test"
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

## Run metric job

```
./datavines-submit.sh metric_job_config.json
```


