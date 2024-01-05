---
id: 'kubernetes-deploy'
title: 'Kubernetes Deploy'
---

## Environmental Preparation
* Installation k8s
* Build datavines image
* Create or download the yml file for datavines on k8s
  * https://raw.githubusercontent.com/datavane/datavines/dev/deploy/k8s/datavines.yaml

## Starting a cluster
Execute the following command by specifying the namespace.
```
kubectl apply -f datavines.yaml -n <namespace>
```

## Test and verify
Get the pod under the namespace and check if the datavines are running properly.
```
kubectl get pod -n <namespace>
```
