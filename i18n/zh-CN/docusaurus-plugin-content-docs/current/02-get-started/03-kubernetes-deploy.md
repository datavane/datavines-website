---
id: 'kubernetes-deploy'
title: 'Kubernetes部署'
---

## 环境准备
* 安装k8s
* 构建datavines镜像
* 创建或下载datavines on k8s的配置文件
  * https://raw.githubusercontent.com/datavane/datavines/dev/deploy/k8s/datavines.yaml

## 部署
指定命名空间执行如下命令。
```
kubectl apply -f datavines.yaml -n <namespace>
```

## 验证
获取命名空间下的pod，查看datavines是否正常运行。
```
kubectl get pod -n <namespace>
```
