(function () {
    'use strict';

    angular
        .module('App')
        .factory('AuthServerProvider', AuthServerProvider);

    AuthServerProvider.$inject = ['$http', '$localStorage', '$sessionStorage', '$q'];

    function AuthServerProvider($http, $localStorage, $sessionStorage, $q) {
        var service = {
            getToken: getToken,
            login: login,
            loginWithToken: loginWithToken,
            storeAuthenticationToken: storeAuthenticationToken,
            logout: logout
        };

        return service;

        function getToken() {

            return $localStorage.authenticationToken || $sessionStorage.authenticationToken;
        }

        function login(credentials) {
            var data = {
                // mobile: credentials.username ? credentials.username : credentials.mobile,
                // password: credentials.password,
                // rememberMe: credentials.rememberMe,
                // terminal: credentials.terminal || 0,
                // ticket: credentials.ticket || 0,
                userID: credentials.userID,
                code: credentials.code
            };
            // if (credentials.authCode) {
            //     data.gaCode = credentials.authCode;
            // }
            // if (credentials.smsCode) {
            //     data.smsCode = credentials.smsCode;
            // }

            return $http({
                method: 'post',
                //url: '/exchmarcket-web-biz/v1/user/login',
                //url: '/exchmarcket-web-biz/v1/userEX/login/stepTwo',
                url: '/exchmarcket-web-biz/v1/user/loginAuth',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: urlencoded(data)
            }).success(authenticateSuccess);

            function authenticateSuccess(data, status, headers) {
                console.log(data);
                if (data.httpCode == 200) {
                    var userid = data.id;
                    if (angular.isDefined(userid) && userid) {
                        var jwt = userid;
                        //service.storeAuthenticationToken(jwt, credentials.rememberMe);
                        service.storeAuthenticationToken(jwt, true);
                        return jwt;
                    }
                } else {
                    return;
                }

            }

            function urlencoded(json) {
                return Object.keys(json).map(function (key) {
                    // body...
                    return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
                }).join("&");
            }
        }

        function loginWithToken(jwt, rememberMe) {
            var deferred = $q.defer();

            if (angular.isDefined(jwt)) {
                this.storeAuthenticationToken(jwt, rememberMe);
                deferred.resolve(jwt);
            } else {
                deferred.reject();
            }

            return deferred.promise;
        }

        function storeAuthenticationToken(jwt, rememberMe) {
            if (rememberMe) {
                $localStorage.authenticationToken = jwt;
            } else {
                $sessionStorage.authenticationToken = jwt;
            }
        }

        function logout() {
            $http.post('/exchmarcket-web-biz/v1/user/logout');
            delete $localStorage.authenticationToken;
            delete $sessionStorage.authenticationToken;
        }
    }
})();
