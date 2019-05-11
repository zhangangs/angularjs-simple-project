(function () {
    'use strict';

    var app = angular.module('App')
    app.factory('ForgetPasswordService', ForgetPasswordService);
    ForgetPasswordService.$inject = ['$resource'];
    function ForgetPasswordService($resource) {
        return $resource('', {}, {
            //用户注册状态检查（手机或邮箱账户）以下所有操作需在同一个cookie完成
            'checkAccountExists': {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                url: '/api/checkAccountExists'
            }
        });
    }
})();