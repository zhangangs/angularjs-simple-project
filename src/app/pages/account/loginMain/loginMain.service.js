(function () {
    'use strict';

    angular
        .module('App')
        .factory('LoginService', LoginService)
        .factory('LoginMainService', LoginMainService);

    LoginService.$inject = ['$uibModal', '$http'];
    LoginMainService.$inject = ['$resource'];

    function LoginService($uibModal, $http) {
        var service = {
            open: open,
            startCaptcha: startCaptcha
        };

        var modalInstance = null;
        var resetModal = function () {
            modalInstance = null;
        };

        return service;

        function open() {
            if (modalInstance !== null) return;
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('login');
                        return $translate.refresh();
                    }]
                }
            });
            modalInstance.result.then(
                resetModal,
                resetModal
            );
        }

        function startCaptcha() {
            var params = {
                method: 'POST',
                url: '/exchmarcket-web-biz/v1/user/startCaptcha',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: urlencoded({ terminal: 0 })
            };

            $http(params).then(function (data) {
                console.log(data);
                if (data.data.captchaServerType == '0') {
                    //删除以前的代码，重新插入一次
                    removeCaptcha();
                    var script = document.createElement('script');
                    script.setAttribute('src', data.data.url);
                    script.setAttribute('type', 'text/javascript');
                    document.head.appendChild(script);
                }
                // document.getElementById('paymentDiv').appendChild(script);
            })
        }

        function urlencoded(json) {
            return Object.keys(json).map(function (key) {
                // body...
                return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
            }).join("&");
        }

        //删除插入的验证码script
        function removeCaptcha() {
            setTimeout(function () {
                var $captcha = $('head script');
                angular.forEach($captcha, function (item, index, array) {
                    // console.log(item)
                    if (item.src.indexOf('captcha') > -1) {
                        $(item).remove();
                    }
                });

            }, 500)
        }
    }

    function LoginMainService($resource) {
        var resourceUrl = '';
        return $resource(resourceUrl, {}, {
            'stepOne': {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                //url: '/exchmarcket-web-biz/v1/userEX/login/stepOne'
                url: '/exchmarcket-web-biz/v1/user/login'
            },
            'stepTwo': {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                //url: '/exchmarcket-web-biz/v1/userEX/login/stepTwo'
                url: '/exchmarcket-web-biz/v1/user/loginAuth'
            },

            'startCaptcha': {
                method: 'POST',
                url: '/exchmarcket-web-biz/v1/user/startCaptcha',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
            }

        });
    }
})();
