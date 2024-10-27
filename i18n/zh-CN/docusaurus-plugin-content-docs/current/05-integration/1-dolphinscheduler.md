---
id: 'dolphin-scheduler'
title: ' DolphinScheduler 中集成 Datavines'
---

## 集成步骤

### 第一步：申请令牌
在 Datavines 中申请令牌，这个令牌是调用 Datavines OpenApi 时用的，步骤如下：
- 创建令牌：

 ![创建令牌](/doc/image/token_create.jpg)

- 查看令牌：

![查看令牌](/doc/image/token_list.png)


### 第二步：创建作业
在 Datavines 中创建数据质量检查作业，拿到规则作业ID

![作业列表ID](/doc/image/job_list_id.png)


### 第三步：在 DS 中创建任务
#### 创建任务
- 进入项目以后，创建或选择一个工作流，进入工作流编辑页面
- 新增一个 Task，选择 Shell 任务类型

![ds任务配置](/doc/image/integration_dolphinscheduler_task_config.jpg)


#### 输入脚本模版
将下面脚本复制到脚本输入框里面，这个脚本是我们提供的脚本模版，用户可以根据自己的需要进行修改，当前脚本的运行结果是根据检查结果来输出的，结果为成功则 exit 0 ，失败则 exit 1。
```
#!/bin/bash

job_execute_url="${datavines_address}/api/v1/openapi/job/execute"
job_execution_status_url="${datavines_address}/api/v1/openapi/job/execution/status/"
job_execution_result_url="${datavines_address}/api/v1/openapi/job/execution/result/"

repsonse_job_execute=$(curl -s -X POST "$job_execute_url/${job_id}" -H "Authorization: Bearer ${token}")

if [ -z "$repsonse_job_execute" ]; then
  echo "[DATAVINES][ERROR]: job execute response is null"
  exit 1
fi

code_job_execute=$(echo "$repsonse_job_execute" | sed -n 's/.*"code":\([0-9]*\).*/\1/p')
job_execution_id=$(echo "$repsonse_job_execute" | sed -n 's/.*"data":\([0-9]*\).*/\1/p')

# 判断 job_execute 接口返回的 code 是否为 200
if [ "$code_job_execute" -ne 200 ]; then
  echo "[DATAVINES][ERROR]: job execute response : $repsonse_job_execute"
  exit 1
fi

echo "[DATAVINES][INFO]: job execution id is $job_execution_id"

# 检查 id 是否为空
if [ -z "$job_execution_id" ]; then
  echo "[DATAVINES][ERROR]: job execute repsonse id is null, exit"
  exit 1
fi

# 轮询 job_execution_status 接口
while true; do
  # 调用 job_execution_status 接口（GET）
  response_job_execution_status=$(curl -s -X GET "$job_execution_status_url/$job_execution_id" -H "Authorization: Bearer ${token}")

  # 提取 job_execution_status 接口返回的 code 和 data 值
  code_job_execution_status=$(echo "$response_job_execution_status" | sed -n 's/.*"code":\([0-9]*\).*/\1/p')
  data_job_execution_status=$(echo "$response_job_execution_status" | sed -n 's/.*"data":"\([^"]*\)".*/\1/p')

  # 判断 job_execution_status 接口返回的 code 是否为 200
  if [ "$code_job_execution_status" -ne 200 ]; then
    echo "[DATAVINES][ERROR]: job execution status repsonse is error: $response_job_execution_result"
    exit 1
  fi

  # 检查返回的 data 值
  if [ "$data_job_execution_status" == "FAILURE" ]; then
    echo "[DATAVINES][ERROR]: job execution status is $data_job_execution_status , exit"
    exit 1
  elif [ "$data_job_execution_status" == "SUCCESS" ]; then
    echo "[DATAVINES][INFO]: job execution status is $data_job_execution_status , to get job execution result"
    
    # 调用 job_execution_result 接口（GET）
    repsonse_job_execution_result=$(curl -s -X GET "$job_execution_result_url/$job_execution_id" -H "Authorization: Bearer ${token}")

    # 提取 job_execution_result 接口返回的 code 和 data
    code_job_execution_result=$(echo "$repsonse_job_execution_result" | sed -n 's/.*"code":\([0-9]*\).*/\1/p')
    data_job_execution_result=$(echo "$repsonse_job_execution_result" | sed -n 's/.*"data":"\([^"]*\)".*/\1/p')

    # 判断 job_execution_result 接口返回的 code 是否为 200
    if [ "$code_job_execution_result" -ne 200 ]; then
      echo "[DATAVINES][ERROR]: job execution result is error: $repsonse_job_execution_result"
      exit 1
    fi

    # 检查 job_execution_result 接口的返回 data 值
    if [ "$data_job_execution_result" == "SUCCESS" ]; then
      echo "[DATAVINES][INFO]: job execution result is $data_job_execution_result"
      exit 0
    else
      echo "[DATAVINES][INFO]: job execution result is $data_job_execution_result"
      exit 1
    fi
  else
    # data_job_execution_status 为其他值时记录日志，但不中断执行
    echo "[DATAVINES][INFO]: job execution status is $data_job_execution_status , continute"
  fi

  # 等待一段时间再进行下一次轮询
  sleep 2
done
```

#### 添加参数
这里需要输入三个参数
- datavines_address: datavines 服务地址，比如 http://localhost:5600
- job_id：作业ID，可以从作业列表上进行复制
- token：在令牌管理页面可以找到

## 第四步：运行工作流
完成上面几个步骤以后，运行 DolphinScheduler 的工作流，查看任务实例日志如下：

![ds任务日志](/doc/image/integration_dolphinscheduler_task_log.jpg)