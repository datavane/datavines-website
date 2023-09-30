"use strict";(self.webpackChunkdatavines_website=self.webpackChunkdatavines_website||[]).push([[793],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>v});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},c=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(a),m=r,v=d["".concat(s,".").concat(m)]||d[m]||u[m]||i;return a?n.createElement(v,o(o({ref:t},c),{},{components:a})):n.createElement(v,o({ref:t},c))}));function v(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:r,o[1]=l;for(var p=2;p<i;p++)o[p]=a[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},8433:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var n=a(7462),r=(a(7294),a(3905));const i={id:"environment-preparation",title:"Environment Preparation"},o="Datavines Environmental Setup Guide",l={unversionedId:"development/environment-preparation",id:"development/environment-preparation",title:"Environment Preparation",description:"Software Requests",source:"@site/docs/06-development/02-environment-preparation.md",sourceDirName:"06-development",slug:"/development/environment-preparation",permalink:"/datavines-website/en/docs/development/environment-preparation",draft:!1,editUrl:"https://github.com/datavane/datavines-website/edit/dev/docs/06-development/02-environment-preparation.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{id:"environment-preparation",title:"Environment Preparation"},sidebar:"tutorialSidebar",previous:{title:"Architecture Design",permalink:"/datavines-website/en/docs/development/architecture-design"},next:{title:"Source Module Explanation",permalink:"/datavines-website/en/docs/development/source-module-explanation"}},s={},p=[{value:"Software Requests",id:"software-requests",level:2},{value:"Clone Git Repository",id:"clone-git-repository",level:3},{value:"Compile source code",id:"compile-source-code",level:3},{value:"Database",id:"database",level:3},{value:"Start DatavinesServer",id:"start-datavinesserver",level:2},{value:"Prepare",id:"prepare",level:3},{value:"Start Service",id:"start-service",level:3}],c={toc:p};function d(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"datavines-environmental-setup-guide"},"Datavines Environmental Setup Guide"),(0,r.kt)("h2",{id:"software-requests"},"Software Requests"),(0,r.kt)("p",null,"Please make sure you have installed the software as follow"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://git-scm.com/downloads"},"Git"),": "),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://www.oracle.com/technetwork/java/javase/downloads/index.html"},"JDK")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"http://maven.apache.org/download.cgi"},"Maven"))),(0,r.kt)("h3",{id:"clone-git-repository"},"Clone Git Repository"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"mkdir datavines\ncd datavines\ngit clone https://github.com/datavane/datavines.git\n")),(0,r.kt)("h3",{id:"compile-source-code"},"Compile source code"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"If you use MySQL as your metadata database, you need to modify datavines/pom.xml and change the scope of the mysql-connector-java dependency to compile. This step is not necessary to use PostgreSQL"),(0,r.kt)("li",{parentName:"ul"},"Run ",(0,r.kt)("inlineCode",{parentName:"li"},"mvn clean install -Prelease -Dmaven.test.skip=true")," ")),(0,r.kt)("h3",{id:"database"},"Database"),(0,r.kt)("p",null,"The Datavines's metadata is stored in relational database. Currently supported MySQL and Postgresql. We use MySQL as an example. Start the database and create a new database named datavines as Datavines metabase"),(0,r.kt)("p",null,"After creating the new database, run the sql file under",(0,r.kt)("inlineCode",{parentName:"p"},"script/sql/datavines-mysql.sql")," to complete the database initialization"),(0,r.kt)("h2",{id:"start-datavinesserver"},"Start DatavinesServer"),(0,r.kt)("p",null,"Following steps will guide how to start the DatavinesServer"),(0,r.kt)("h3",{id:"prepare"},"Prepare"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Open project: Use IDE open the project, here we use Intellij IDEA as an example")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Configure database related information"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"If you use MySQL as your metadata database, you need to modify datavines/pom.xml and change the scope of the mysql-connector-java dependency to compile. This step is not necessary to use PostgreSQL"),(0,r.kt)("li",{parentName:"ul"},"change database config in  ",(0,r.kt)("inlineCode",{parentName:"li"},"datavines-server/src/main/resources/application.yaml")," ")),(0,r.kt)("p",{parentName:"li"},"For example"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-application.yaml"}," spring:\n   datasource:\n     driver-class-name: com.mysql.cj.jdbc.Driver\n     url: jdbc:mysql://127.0.0.1:3306/datavines?useUnicode=true&characterEncoding=UTF-8\n     username: root\n     password: 123456\n")))),(0,r.kt)("h3",{id:"start-service"},"Start Service"),(0,r.kt)("p",null,"Start ",(0,r.kt)("inlineCode",{parentName:"p"},"DatavinesServer")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"add options in VM Options "),(0,r.kt)("ul",{parentName:"blockquote"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"-Dspring.profiles.active=mysql")," "),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"-Dlogging.config=classpath:server-logback.xml")," "))),(0,r.kt)("p",null,"When you see the log that ",(0,r.kt)("inlineCode",{parentName:"p"},"[INFO] 2022-04-10 12:29:05.447 io.datavines.server.DatavinesServer:[61] - Started DatavinesServer in 3.97 seconds (JVM running for 4.69)")," in console\uff0cDatavinesServer started successfully."))}d.isMDXComponent=!0}}]);