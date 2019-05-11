(function () {
    'use strict';
    /**
     * @ 首页
     */
    var app = angular.module('App');
    app.controller('IndexController', IndexController);
    IndexController.$inject = ['$scope', '$http', '$interval'];

    function IndexController($scope, $http, $interval) {
        var vm = this;
        vm.timer = null;    //新闻公告滚动定时器
        vm.data = {

        }

        vm.resoure = {
            articles: [],       //新闻
        }

        vm.method = {
        }

        //初始化
        function init() {
            getArticles();  //获取公告
        }


        //获取最新公告
        function getArticles() {
            vm.resoure.articles = [
                {
                    title: "111111111",
                    created_at: '2018-12-18T06:05:39Z'
                },
                {
                    title: "2222222",
                    created_at: '2018-12-18T06:05:39Z'
                }, {
                    title: "3333333",
                    created_at: '2018-12-18T06:05:39Z'
                }
            ]

            vm.timer = $interval(function () {
                AutoScroll(".news");
            }, 5000);
        }

        //新闻自动滚动
        function AutoScroll(obj) {
            $(obj).find(".new-body").animate({
                marginTop: "-39px"
            },
                500,
                function () {
                    $(this).css({
                        marginTop: "0px"
                    }).find(".new-item:first").appendTo(this);
                });
        }

        //页面加载完成后执行代码
        $(document).ready(function () {
            var mySwiper = new Swiper('.swiper-container', {
                loop: true,             // 循环模式选项
                autoplay: {             //自动循环
                    delay: 5000         //5秒切换一次
                },

                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,    //点击小点切换分页
                }
            })

            //新闻放上去，停止滚动
            $('.news').hover(function () {
                $interval.cancel(vm.timer);
            }, function () {
                vm.timer = $interval(function () {
                    AutoScroll(".news");
                }, 5000);
            })
        })

        //页面关闭，取消定时器
        $scope.$on('$destroy', function () {
            $interval.cancel(vm.timer);
        })

        init();
    }
})();
