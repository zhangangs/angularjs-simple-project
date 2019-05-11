(function () {
    'use strict';
    /**
     * @ 全局配置
     * Author:Veiss, Date: 2018/10/28
     */
    var app = angular.module('App');

    // Popup弹出框配置
    app.config(['PopupProvider', 'toastrConfig', function (PopupProvider, toastrConfig) {
        PopupProvider.title = '提示';
        PopupProvider.okValue = '确定';
        PopupProvider.cancelValue = '取消';

        angular.extend(toastrConfig, {
            containerId: 'toast-container',
            progressBar: true,
            // extendedTimeOut: 500000
        })
    }]);

})();
