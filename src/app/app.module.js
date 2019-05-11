(function () {
  'use strict';

  var app = angular.module('App', [
    'tmh.dynamicLocale',
    'pascalprecht.translate',
    'ngResource',
    'ngCookies',
    'ngStorage',
    'ngCacheBuster',
    //时间插件
    'ui.bootstrap.datetimepicker',
    //路由管理
    'ui.router',
    //图片上传
    'angularFileUpload',
    //二维码生成器
    'monospaced.qrcode',
    'ui.bootstrap',
    //表单验证
    'angularValidator',
    //提示框
    'toastr',
    //弹出框
    'angular-popups',
    //请求接口等待效果
    'cgBusy'
  ]);
})();
