'use strict';
/**
 * gulp打包流程，重构，去除很多不必要的步骤和插件，提高效率，流程更清晰简单
 * Author:Veiss, date: 2019/1/6
 * modify !
 * @dev 
 * 1、bower中的css和js插入到index ok
 * 2、src中的css和js插入到index ok
 * 3、启动服务 ok
 * 4、监听文件变动，重启刷新 ok
 * 
 * @prod
 * 1、bower中的css合并成vendor.css ok
 * 2、bower中的js合并成vendor.js ok
 * 3、src中的css合并成app.css ok
 * 4、src中的js合并成app.js ok
 * 5、拷贝css、fonts、images、118n、和其他插件到dist文件夹中 ok
 * 6、index重写 ok
 * */
var config = require('./gulp.config');
var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create(),
    angularFilesort = require('gulp-angular-filesort'),
    proxy = require('http-proxy-middleware'),
    clean = require('gulp-clean'),
    less = require('gulp-less'),
    wiredep = require('wiredep').stream,    //bower自动引入
    inject = require('gulp-inject'),
    rev = require('gulp-rev'),
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if'),
    revReplace = require("gulp-rev-replace"),
    minCss = require('gulp-clean-css'),//压缩CSS
    uglify = require('gulp-uglify'),    //压缩js
    babel = require('gulp-babel'),      //es6转换
    autoprefixer = require('gulp-autoprefixer'),
    cheerio = require('gulp-cheerio'),
    stripDebug = require("gulp-strip-debug"); //     //去除debugger和console信息

//清理dist目录
gulp.task('clean:dist', function () {
    return gulp.src(config.dist, { read: false })
        .pipe(clean());
});

//清理编译的css，保证css都是最新的
gulp.task('clean:css', function () {
    return gulp.src(config.app + '/assets/css', { read: false })
        .pipe(clean());
});

//编译less
gulp.task('less', ['clean:css'], function () {
    return gulp.src(config.app + 'app/**/*.less')
        .pipe(less())
        .pipe(gulp.dest(config.app + 'assets/css'))
})

//注入用户css到index文件中
gulp.task('inject:css', ['less'], function () {
    return gulp.src(config.app + 'index.html')
        .pipe(inject(gulp.src('src/assets/css/**/*.css', { read: false }), { relative: true }))
        .pipe(gulp.dest(config.app));
});

//注入用户js到index文件中
gulp.task('inject:js', function () {
    return gulp.src('src/index.html')
        .pipe(inject(gulp.src('src/app/**/*.js')
            .pipe(angularFilesort()), { relative: true }))
        .pipe(gulp.dest(config.app));
});


// //注入bower插件到index中
gulp.task('bower:css:js', function () {
    gulp.src('src/index.html')
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here'
        }))
        .pipe(gulp.dest(config.app));
});

//文件监听
gulp.task('watch', function () {
    gulp.watch(config.app + 'app/**/*.less', ['inject:css']);
    gulp.watch(config.app + 'app/**/*.js', ['inject:js']);
    gulp.watch([config.app + '*.html', config.app + 'app/**', config.app + 'i18n/**']).on('change', browserSync.reload);
});

//测试环境
gulp.task('serve', function (callback) {
    runSequence('bower:css:js', 'inject:css', 'inject:js', 'watch', function () {
        startBrowserSync('dev')
    });
})

//打包,生产环境
gulp.task('build', function (callback) {
    runSequence('clean:dist', 'bower:css:js', 'inject:css', 'inject:js', 'copy', 'useref', callback);
})

//打包并且启动服务
gulp.task('serve-dist', function (callback) {
    runSequence('clean:dist', 'bower:css:js', 'inject:css', 'inject:js', 'copy', 'useref', function () {
        startBrowserSync('prod');
    });
});

//拷贝静态资源
gulp.task('copy', function (callback) {
    runSequence('copy:images', 'copy:fonts', 'copy:vendors', 'copy:i18n', 'copy:base', 'copy:html', callback);
})

//拷贝images
gulp.task('copy:images', function () {
    return gulp.src(config.app + 'assets/images/**')
        .pipe(imagemin())
        .pipe(gulp.dest(config.dist + 'assets/images'))
});

//拷贝fonts
gulp.task('copy:fonts', function () {
    return gulp.src(config.app + 'assets/fonts/**')
        .pipe(gulp.dest(config.dist + 'assets/fonts'))
});


//拷贝vendors文件
gulp.task('copy:vendors', function () {
    return gulp.src(config.app + 'vendors/**')
        .pipe(gulp.dest(config.dist + 'vendors'));
})
// //拷贝TradingView相关依赖
// gulp.task('copy:charting_library', [], function () {
//     return gulp.src(config.app + 'content/charting_library/**')
//         .pipe(gulp.dest(config.dist + "content/charting_library"));
// });

// //拷贝eosjs相关依赖
// gulp.task('copy:eosjs', function () {
//     return gulp.src(config.app + 'content/eosjs/package/lib/**')
//         .pipe(gulp.dest(config.dist + 'content/eosjs/package/lib'));
// })

// //拷贝ScatterJS相关依赖
// gulp.task('copy:scatterjs', function () {
//     return gulp.src(config.app + 'content/scatter-js/bundles/**')
//         .pipe(gulp.dest(config.dist + 'content/scatter-js/bundles'));
// })

//拷贝i18n
gulp.task('copy:i18n', function () {
    return gulp.src(config.app + 'i18n/**')
        .pipe(gulp.dest(config.dist + 'i18n/'));
})

//拷贝网站访问相关文件
gulp.task('copy:base', function () {
    var src = [config.app + 'robots.txt', config.app + 'favicon.ico', config.app + '.htaccess', config.app + 'manifest.webapp'];
    return gulp.src(src, { dot: true })
        .pipe(gulp.dest(config.dist));
})

//拷贝压缩所有的html
gulp.task('copy:html', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    return gulp.src(config.app + 'app/**/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest(config.dist + 'app/'));
});

//index.html中的资源合并
gulp.task('useref', function () {
    //GA分析代码
    var extend = `
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-134767022-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-134767022-1');
    </script>`;
    return gulp.src(config.app + 'index.html')
        //提取合并，生成verdor.js  vendor.css main.js main.css 
        .pipe(useref())

        //排除index.html
        .pipe(gulpIf('**/*.!(html)', rev()))

        //用户的jses6转换成es5语法
        .pipe(gulpIf('**/app-*.js', babel({ presets: ['@babel/env'] })))
        //去除调试信息
        .pipe(gulpIf('**/app-*.js', stripDebug()))

        //js压缩
        .pipe(gulpIf('*.js', uglify()))

        //css加版本前缀和压缩
        .pipe(gulpIf('*.css', autoprefixer()))
        .pipe(gulpIf('*.css', minCss()))
        //更名
        .pipe(revReplace({}))

        //index.html添加额外的js代码
        .pipe(gulpIf('**/index.html', cheerio(function ($, file) {
            $('body').append(extend);
        })))

        .pipe(gulp.dest(config.dist));
})

/**
 * 启动服务器
 * @param {*} env = dev ?  prod
 */
function startBrowserSync(env) {
    var proxyRoutes = [config.apiAddress, '/exchmarcket-web-trading'];

    //接口配置
    var webProxy = proxy(proxyRoutes, {
        target: config.url,   //默认目标服务器地址
        //changeOrigin: true,
        //logLevel: 'debug'

        //意外处理
        router: {
            '/exchmarcket-web-trading': 'http://b03.dev.ttlix:8080'
        }
    });
    var options = {
        server: {
            baseDir: env == 'dev' ? config.app : config.dist,
            middleware: [webProxy]
        },
        port: config.port
    }

    //start
    browserSync.init(options);
}
