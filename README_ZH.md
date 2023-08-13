Datavines官网是使用node编译的，使用的是Docusaurus框架组件

#### 环境准备
下载并安装 nodejs (version>12.5.0)

#### 准备代码
克隆代码到本地 `git clone https://github.com/datavane/datavines-website.git`

#### 安装依赖
运行 `npm install` 来安装所需的依赖库。

#### 启动英文版站点
在根目录运行`npm run start`，可以访问http://localhost:3000查看站点英文模式预览

#### 启动中文版站点
在根目录运行`npm run start -- --locale zh-CN`，可以访问http://localhost:3000查看站点的中文模式预览

#### 生成静态网站资源文件
运行 `npm run build`。构建的静态资源在build目录中。