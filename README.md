git: https://github.com/PaPiStart/angularjs2-typescript-gulp.git
====

## 概述

angularjs2-typescript-gulp

前端环境：
	代码管理：git
	开发环境：npm,gulp
	开发框架：angualrjs2,typescript

## 开发

```
git clone https://github.com/PaPiStart/angularjs2-typescript-gulp.git
npm install -g cnpm  --网速不快，可用淘宝镜像
npm/cnpm install -g gulp
npm/cnpm install
bower install
gulp -ws
```
运行`gulp -ws`命令，会监听`src`目录下所有文件的变更，并且默认会在`3000`端口启动服务器，然后在浏览器打开 `http://localhost:3000`。
运行`gulp -ws`命令，会启用后台代理转发。

## 打包

```
gulp -wm 
-m 压缩文件(img、css、less、js)
-w 启动编译
```
运行`gulp -wm`命令，编译`src`下的文件，生成编译后的文件`dist`,

