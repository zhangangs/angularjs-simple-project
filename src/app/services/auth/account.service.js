(function () {
    'use strict';

    angular
        .module('App')
        .factory('Account', Account);

    Account.$inject = ['$resource'];

    function Account($resource) {
        var service = $resource('/exchmarcket-web-biz/v1/user/login', {
            mobile: 0,
            terminal: 0,
            ticket: 0
        }, {
                'get': {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    isArray: false,
                    interceptor: {
                        response: function (response) {
                            // expose response
                            return response;
                        }
                    }
                }
            });
        return service;
    }
})();
