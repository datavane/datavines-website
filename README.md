DataVines website is compiled using node, using Docusaurus framework components

#### Environment Preparation
Download and install nodejs (version>12.5.0)
#### Download Code
Clone the code to the local `git clone https://github.com/datavines-ops/datavines-website.git`
#### Install Dependencies
Run `npm install` to install the required dependent libraries.
#### Start English version of the website
Run `npm run start` in the root directory, you can visit http://localhost:3000 to view the English mode preview of the site
#### Start Chinese version of the website
Run `npm run start -- --locale zh-CN` in the root directory, you can visit http://localhost:3000 to view the Chinese mode preview of the site
#### Generate static website resource files
Run `npm run build`. The static resources of the build are in the build directory.