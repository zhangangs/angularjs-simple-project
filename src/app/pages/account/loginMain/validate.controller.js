(function () {
    'use strict';

    var app = angular.module('App');
    app.controller('ValidateModalController', ValidateModalController);

    ValidateModalController.$inject = ['$uibModalInstance', 'Auth', '$state', 'initData', '$rootScope', '$stateParams', 'toastr', 'utils', '$cookies'];

    function ValidateModalController($uibModalInstance, Auth, $state, initData, $rootScope, $stateParams, toastr, utils, $cookies) {
        var vm = this;

        //变量
        vm.data = {
            code: '',    //验证码
        }

        //资源
        vm.resoure = {
            account: initData
        }

        //方法
        vm.method = {
            stepTwo: stepTwo,
            cancel: cancel,
            submitForm: submitForm
        }

        //自动提交表单
        function submitForm(event) {
            console.log(vm.data.code, vm.data.code.length);
            if (vm.data.code.length == 6) {
                stepTwo();
            }
        }

        //登录认证
        function stepTwo() {
            vm.isLoading = true;
            var params = Object.assign(vm.resoure.account, vm.data);
            Auth.login(params).then(function (_data) {
                console.log(_data);
                vm.isLoading = false;
                //展示弹出框二次验证
                if (_data.data.httpCode != 200) {
                    vm.authenticationError = true;
                    toastr.error(_data.data.msg, '温馨提示', { closeButton: true });
                } else {
                    cancel();
                    if (vm.resoure.account.rememberMe) {
                        setCookies(vm.resoure.account.username, vm.resoure.account.password);
                    }

                    //有跳转到地址
                    if ($stateParams.route_id) {
                        //路由带参,解析参数跳转
                        if ($stateParams.route_id.split('?')[1]) {
                            var router = $stateParams.route_id.split('?')[0];
                            var params = utils.locationSerch($stateParams.route_id.split('?')[1]);
                            console.log(params);
                            $state.go(router, params);
                        } else {
                            $state.go($stateParams.route_id);
                        }

                    } else {
                        $state.go('userManager');
                    }
                    $rootScope.$broadcast('authenticationSuccess');

                    //更新未读消息
                    $rootScope.$broadcast('readMessageSuccess');
                }

                if (Auth.getPreviousState()) {
                    var previousState = Auth.getPreviousState();
                    Auth.resetPreviousState();
                    $state.go(previousState.name, previousState.params);
                }
            }).catch(function () {
                vm.authenticationError = true;
            });
        }

        function setCookies(username, password) {
            //三天过期
            var time = new Date().getTime() + 60 * 1000 * 24 * 3;
            var _value = {
                username: username,
                password: password
            };

            $cookies.put('_REMEMBER', JSON.stringify(_value), {
                'expires': new Date(time)
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
