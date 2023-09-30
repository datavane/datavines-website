"use strict";(self.webpackChunkdatavines_website=self.webpackChunkdatavines_website||[]).push([[782],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>m});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),u=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=u(e.components);return r.createElement(c.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=u(n),f=a,m=p["".concat(c,".").concat(f)]||p[f]||d[f]||i;return n?r.createElement(m,o(o({ref:t},s),{},{components:n})):r.createElement(m,o({ref:t},s))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=f;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[p]="string"==typeof e?e:a,o[1]=l;for(var u=2;u<i;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},7131:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>l,toc:()=>u});var r=n(7462),a=(n(7294),n(3905));const i={id:"local-engine",title:"Local \u5f15\u64ce"},o=void 0,l={unversionedId:"features/engine/local-engine",id:"features/engine/local-engine",title:"Local \u5f15\u64ce",description:"\u539f\u7406\u89e3\u91ca",source:"@site/i18n/zh-CN/docusaurus-plugin-content-docs/current/04-features/03-engine/01-local-engine.md",sourceDirName:"04-features/03-engine",slug:"/features/engine/local-engine",permalink:"/datavines-website/docs/features/engine/local-engine",draft:!1,editUrl:"https://github.com/datavane/datavines-website/edit/dev/i18n/zh-CN/docusaurus-plugin-content-docs/current/04-features/03-engine/01-local-engine.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{id:"local-engine",title:"Local \u5f15\u64ce"},sidebar:"tutorialSidebar",previous:{title:"\u8de8\u8868\u51c6\u786e\u6027",permalink:"/datavines-website/docs/features/metric/multi-table-metric/multi-table-accuracy"},next:{title:"Spark \u5f15\u64ce",permalink:"/datavines-website/docs/features/engine/spark-engine"}},c={},u=[{value:"\u539f\u7406\u89e3\u91ca",id:"\u539f\u7406\u89e3\u91ca",level:2},{value:"\u4f7f\u7528\u65b9\u6cd5",id:"\u4f7f\u7528\u65b9\u6cd5",level:2},{value:"\u6ce8\u610f\u4e8b\u9879",id:"\u6ce8\u610f\u4e8b\u9879",level:2}],s={toc:u};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"\u539f\u7406\u89e3\u91ca"},"\u539f\u7406\u89e3\u91ca"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Local")," \u5f15\u64ce\u662f\u901a\u8fc7 ",(0,a.kt)("inlineCode",{parentName:"p"},"Jdbc")," \u7684\u65b9\u5f0f\u8fde\u63a5\u6570\u636e\u6e90\uff0c\u6267\u884c\u6839\u636e\u6570\u636e\u8d28\u91cf\u68c0\u67e5\u89c4\u5219\u751f\u6210\u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"SQL")," \u8bed\u53e5\uff0c\u5f97\u5230\u76f8\u5e94\u7684\u9519\u8bef\u6570\u636e\u89c6\u56fe\u3001\u5b9e\u9645\u503c\u548c\u671f\u671b\u503c\uff0c\u6700\u540e\u5c06\u5b9e\u9645\u503c\u548c\u671f\u671b\u503c\u5199\u5230 ",(0,a.kt)("inlineCode",{parentName:"p"},"Datavines")," \u7cfb\u7edf\u7684\u6267\u884c\u7ed3\u679c\u8868\u4ee5\u53ca\u5c06\u9519\u8bef\u6570\u636e\u89c6\u56fe\u4e2d\u7684\u6570\u636e\u5199\u5230\u9519\u8bef\u6570\u636e\u5b58\u50a8\u5f15\u64ce\u3002"),(0,a.kt)("h2",{id:"\u4f7f\u7528\u65b9\u6cd5"},"\u4f7f\u7528\u65b9\u6cd5"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Local")," \u5f15\u64ce\u7684\u4f7f\u7528\u975e\u5e38\u7b80\u5355\uff0c\u521b\u5efa\u6570\u636e\u8d28\u91cf\u68c0\u67e5\u4f5c\u4e1a\u65f6\u9ed8\u8ba4\u4f7f\u7528\u7684\u662f ",(0,a.kt)("inlineCode",{parentName:"p"},"Local")," \u5f15\u64ce\uff0c\u65e0\u9700\u505a\u4efb\u4f55\u989d\u5916\u7684\u914d\u7f6e\uff0c\u4fdd\u5b58\u597d\u914d\u7f6e\u6267\u884c\u5373\u53ef\uff0c\u9700\u8981\u5173\u6ce8\u4e00\u4e0b\u6ce8\u610f\u4e8b\u9879\u3002"),(0,a.kt)("h2",{id:"\u6ce8\u610f\u4e8b\u9879"},"\u6ce8\u610f\u4e8b\u9879"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u7528\u4e8e\u521b\u5efa\u6570\u636e\u6e90\u7684\u7528\u6237\u9700\u8981\u6709\u521b\u5efa\u89c6\u56fe\u548c\u5220\u9664\u89c6\u56fe\u7684\u6743\u9650\uff0c\u5982\u679c\u4f60\u60f3\u8981\u5c06\u9519\u8bef\u6570\u636e\u5199\u5165\u5230\u68c0\u67e5\u7684\u6570\u636e\u6e90\u4e2d\u67d0\u4e2a\u5e93\u4e2d\uff0c\u90a3\u4e48\u4f60\u7684\u7528\u6237\u9700\u8981\u6709\u521b\u5efa\u8868\u7684\u6743\u9650\u3002")))}p.isMDXComponent=!0}}]);