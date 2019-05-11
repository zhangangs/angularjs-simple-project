(function () {
    'use strict';
    /**
     * HTTP拦截
     * Author: Veiss Date:2019/1/1
     */
    var app = angular.module('App');
    app.factory('httpInterceptor', httpInterceptor);

    httpInterceptor.$inject = ['$q', '$injector', '$filter'];

    function httpInterceptor($q, $injector, $filter) {
        var httpInterceptor = {
            //响应失败
            responseError: function (response) {
                // console.log(response, "responseError");
                // if (response.status == 401) { // 401 Unauthorized 当前请求需要用户验证
                //     var rootScope = $injector.get('$rootScope');
                //     //var state = $injector.get('$rootScope').$state.current.name;
                //     //rootScope.stateBeforLogin = state;
                //     var state = $injector.get('$state');
                //     state.go("unauthorized");
                // } else if (response.status === 404) { // 404 Not Found
                //     console.log("404!");
                //     var state = $injector.get('$state');
                //     state.go("error404");
                //     return $q.reject(response);
                // } else if (response.status === 408) { // 408 Request Timeout
                //     console.log("408!");
                //     var state = $injector.get('$state');
                //     state.go("unauthorized");
                //     return $q.reject(response);
                // }
                 return $q.reject(response);
            },

            /**
             * 请求响应成功
             * @ 因为要根据时区转换时间，获取到服务器的时间在做调整
             * @ 循环整个返回的数据，遍历所有的字段，找到时间字段做调整，
             * @ just do it!
             *  */
            response: function (response) {
                //需要过滤的请求地址
                var requestUrl = response.config.url;
                if (requestUrl.indexOf('exchmarcket-web-biz') > -1) {
                    return recursionTraversalObject(response);
                }
                return response;
            },
            //请求发送成功
            request: function (config) {
                //console.log(config, "request");
                return config;
            },
            //请求发送失败
            requestError: function (config) {
                //console.log(config, "requestError");
                return $q.reject(config);
            }
        };

        //递归遍历返回的数据
        function recursionTraversalObject(obj) {
            for (let i in obj) {
                if (i.indexOf('Time') > -1) {
                    obj[i] = dateFormat(obj[i]);
                }
                if (typeof (obj[i]) == 'object') {
                    recursionTraversalObject(obj[i]);
                }
            }
        }

        //获取时区，根据时区转换时间
        // @date:时间    format：格式[YYYY-MM-DD HH:mm:ss]
        function dateFormat(date, formatDate) {
            if (!date) return;
            //默认YYYY-MM-DD HH:mm:ss格式
            var format = formatDate || 'YYYY-MM-DD HH:mm:ss';

            //时间戳
            var resultDate = date;

            //判断是否为日期格式
            if (isNaN(date) && !isNaN(Date.parse(date))) {
                resultDate = Date.parse(date);
            }

            // //如果是时间戳格式
            else if (_.isNumber(date) && date.toString().length == 10) {
                resultDate = date * 1e3;
            }

            //时间戳转换时时间格式
            resultDate = $filter('date')(resultDate, 'yyyy-MM-dd HH:mm:ss');

            var hours = moment(resultDate).utcOffset() / 60;
            var newDate = moment(resultDate).add(hours, 'hours').format(format);
            
            return newDate;
        }

        return httpInterceptor;
    }
})();
