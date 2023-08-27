"use strict";(self.webpackChunkdatavines_website=self.webpackChunkdatavines_website||[]).push([[731],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=c(n),m=a,f=d["".concat(s,".").concat(m)]||d[m]||p[m]||o;return n?r.createElement(f,i(i({ref:t},u),{},{components:n})):r.createElement(f,i({ref:t},u))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8560:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var r=n(7462),a=(n(7294),n(3905));const o={id:"local-mode",title:"\u672c\u5730\u8fd0\u884c\u6a21\u5f0f"},i=void 0,l={unversionedId:"user-guide/local-mode",id:"user-guide/local-mode",title:"\u672c\u5730\u8fd0\u884c\u6a21\u5f0f",description:"\u521b\u5efa\u89c4\u5219\u914d\u7f6e\u6587\u4ef6",source:"@site/i18n/zh-CN/docusaurus-plugin-content-docs/current/03-user-guide/02-local-mode.md",sourceDirName:"03-user-guide",slug:"/user-guide/local-mode",permalink:"/datavines-website/zh-CN/docs/user-guide/local-mode",draft:!1,editUrl:"https://github.com/datavane/datavines-website/edit/dev/i18n/zh-CN/docusaurus-plugin-content-docs/current/03-user-guide/02-local-mode.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{id:"local-mode",title:"\u672c\u5730\u8fd0\u884c\u6a21\u5f0f"},sidebar:"tutorialSidebar",previous:{title:"\u5feb\u901f\u4e0a\u624b",permalink:"/datavines-website/zh-CN/docs/user-guide/quick-start"},next:{title:"\u6570\u636e\u76ee\u5f55",permalink:"/datavines-website/zh-CN/docs/features/catalog/"}},s={},c=[{value:"\u521b\u5efa\u89c4\u5219\u914d\u7f6e\u6587\u4ef6",id:"\u521b\u5efa\u89c4\u5219\u914d\u7f6e\u6587\u4ef6",level:2},{value:"\u6dfb\u52a0\u4ee5\u4e0b\u5185\u5bb9\u5230\u914d\u7f6e\u6587\u4ef6\u4e2d",id:"\u6dfb\u52a0\u4ee5\u4e0b\u5185\u5bb9\u5230\u914d\u7f6e\u6587\u4ef6\u4e2d",level:2},{value:"\u4ee5\u811a\u672c\u5f62\u5f0f\u6267\u884c\u6570\u636e\u8d28\u91cf\u68c0\u67e5\u4f5c\u4e1a",id:"\u4ee5\u811a\u672c\u5f62\u5f0f\u6267\u884c\u6570\u636e\u8d28\u91cf\u68c0\u67e5\u4f5c\u4e1a",level:2}],u={toc:c};function d(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"\u521b\u5efa\u89c4\u5219\u914d\u7f6e\u6587\u4ef6"},"\u521b\u5efa\u89c4\u5219\u914d\u7f6e\u6587\u4ef6"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"cd datavines-1.0.0-SNAPSHOT-bin/bin\nvi metric_job_config.json\n")),(0,a.kt)("h2",{id:"\u6dfb\u52a0\u4ee5\u4e0b\u5185\u5bb9\u5230\u914d\u7f6e\u6587\u4ef6\u4e2d"},"\u6dfb\u52a0\u4ee5\u4e0b\u5185\u5bb9\u5230\u914d\u7f6e\u6587\u4ef6\u4e2d"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'{\n  "languageEn":true,\n  "name":"test",\n  "executePlatformType":"client",\n  "parameter":{\n    "connectorParameter":{\n      "type":"mysql",\n      "parameters":{\n        "database":"test",\n        "password":"123456",\n        "port":"3306",\n        "host":"localhost",\n        "user":"root",\n        "properties":"useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=Asia/Shanghai"\n      }\n    },\n    "metricParameterList":[\n      {\n        "metricType":"column_duplicate",\n        "metricParameter":{\n          "table":"test_table",\n          "column":"test_column",\n          "database":"test"\n        },\n\n        "expectedType":"fix_value",\n        "expectedParameter":{\n          "expected_value":"10"\n        },\n        "resultFormula":"count",\n        "operator":"lt",\n        "threshold":5.0\n      }\n    ]\n  },\n  "errorDataStorageType": "file",\n  "errorDataStorageParameter": {\n    "data_dir":"/tmp/datavines/error-data",\n    "column_separator":","\n  },\n  "validateResultDataStorageType": "file",\n  "validateResultDataStorageParameter":{\n    "data_dir":"/tmp/datavines/validate-result-data",\n    "column_separator":","\n  },\n  "notificationParameters": [\n    {\n      "type":"email",\n      "config": {\n        "serverHost":"smtp.qq.com",\n        "serverPort":"25",\n        "sender":"1234567@qq.com", // input your mail\n        "enableSmtpAuth":"true",\n        "user":"123456@qq.com", // input your username\n        "passwd":"123456", // input your passwd\n        "starttlsEnable":"false",\n        "sslEnable":"false",\n        "smtpSslTrust":"true"\n      },\n      "receiver": {\n        "to":"12345566@qq.com" // input receiver email\n      }\n    }\n  ]\n}\n\n')),(0,a.kt)("h2",{id:"\u4ee5\u811a\u672c\u5f62\u5f0f\u6267\u884c\u6570\u636e\u8d28\u91cf\u68c0\u67e5\u4f5c\u4e1a"},"\u4ee5\u811a\u672c\u5f62\u5f0f\u6267\u884c\u6570\u636e\u8d28\u91cf\u68c0\u67e5\u4f5c\u4e1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"./datavines-submit.sh metric_job_config.json\n")))}d.isMDXComponent=!0}}]);