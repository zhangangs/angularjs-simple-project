# 基于Angular 1.x + gulp + bower + less项目

实际项目中使用到的结构，受到项目工程化影响，把每个模块独立分开。

开发时拆分：
除了公共部分以外，`index`,`other`等系列模块独立开发维护，一个文件夹就代表一个模块，一堆的业务逻辑。`后期好维护，不需要到a文件夹下删除index.a.css,b文件夹删除index.b.js`

controller、html、css、state都放到对应的文件夹下面。(在原来的设想中images也是拆分到每个模块的，一些其他原因没有做这个功能)

打包时会生成4个文件：
`vendor.css`，`vendor.js`
`app.css`，`app.js`


## 项目结构

```
ProjectName/ 项目名 
├── node_modules/   
├── src/ 开发目录               
│     ├── app/ 所有的前端代码会放在这里
│     │     ├── pages/ 页面
│     │     │       ├── index/ 首页
│     │     │       │       ├── index.controller.js     // controller
│     │     │       │       ├── index.html              // View
│     │     │       │       ├── index.less              // less
│     │     │       │       ├── index.service.js        // api
│     │     │       │       └── index.state.js          // router
│     │     │       └── 其他页面/ 首页
│     │     ├── layouts/ 公共布局
│     │     │       ├── navbar / 
│     │     │       │       ├── navbar.controller.js        
│     │     │       │       ├── navbar.less                 
│     │     │       │       └── navbar.html                  
│     │     │       └── footer /  
│     │     ├── components/ 公共组件
│     │     │       ├── frontPagination / 
│     │     │       │       ├── frontPagination.directive.js        
│     │     │       │       ├── frontPagination.less                 
│     │     │       │       └── frontPagination.html                  
│     │     │       └── footer /     
│     │     ├── services/ 公共服务配置
│     │     │       ├── config/ 配置
│     │     │       └── interceptor/ 注入    
│     │     ├── styles/ 公共样式文件
│     │     │       ├── common.less             // 公共less
│     │     │       └── iconfont.less           // 字体文件
│     │     ├── app.constants.js         // 静态配置
│     │     ├── app.module.js            // 全局module，所有的插件都在这里引入
│     │     └── app.state.js             // router
│     ├── bower_components/ bower插件目录
│     ├── assets/ 静态资源
│     │     ├── css/                //pages中less文件自动生成的css.
│     │     ├── fonts/              //字体文件
│     │     └── images/             //图片
│     ├── vendors/ 自定义插件,需要手动引入到index.html
│     ├── i18n/ 国际化i18n
│     │     ├── en/                 
│     │     │   ├── home.json/            //首页
│     │     |   └── other.json/           //其他
│     │     ├── zh-cn/             
│     │     |   ├── home.json/            //首页
│     │     |   └── other.json/           //其他
│     ├── 404.html
│     ├── favicon.ico
│     └── index.html
├── dist/ 项目打包文件
├── .bowerrc
├── .gitattributes
├── .gitignore
├── bower.json
├── gulp.config.js 
├── gulpfile.js
├── package.json
└── README.md
```

## 搭建开发环境
**nodejs(推荐v8.12.0)**

下载地址：[https://nodejs.org/download/release/v8.12.0/]()

**bower,less,gulp 全局安装**
```
npm install bower,less,gulp -g
```

## 项目运行
**第一次运行**
```
cd ProjectName
npm install 或 yarn install(需要安装yarn)
bower install
gulp serve
```

## 项目如何打包?

```
gulp serve-dist
```
`gulp serve-dist` 会将文件打包到 `target/wwww` 目录下，并且启动一个服务器，可以检测你的本地代码是否正常运行。

通常情况下，本地打包通过后，提交的代码也是没问题的。

## 生产环境打包
```
gulp build
```

## 本地开发服务器配置？

**如何配置服务器地址？**

打开`gulp.config.js`修改`url`字段即可。
  
**修改`api`地址**

打开`gulp.config.js`修改`apiAddress`字段


## 可能遇到的问题？
**项目所有js合成了一个文件,首次加载会很慢？**
可以参考[oclazyload](https://oclazyload.readme.io/)， [关于解决前端首页加载慢的问题](https://zhangangs.github.io/2018/06/19/%E5%85%B3%E4%BA%8E%E8%A7%A3%E5%86%B3%E5%89%8D%E7%AB%AF%E9%A6%96%E9%A1%B5%E5%8A%A0%E8%BD%BD%E6%85%A2%E7%9A%84%E9%97%AE%E9%A2%98/)
  