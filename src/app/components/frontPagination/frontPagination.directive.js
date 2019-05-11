(function () {
    'use strict';

    /**
     * @ 前端数据分页组件，指令
     * 调用方法： <front-pagination data="vm.data" callback-data="vm.callbackData"></front-pagination>
     * 参数data: 是为分页数据列表
     * 参数callback-data： 是处理好的分页数据，用于循环展示
     * Author:Veiss, Date: 2018/10/25
     * */
    var app = angular.module('App');
    app.directive('frontPagination', frontPagination);

    function frontPagination() {
        return {
            restrict: 'E',
            replace: true,	//指令链接模板是否替换原有元素
            templateUrl: 'app/components/frontPagination/frontPagination.html',
            scope: {
                // data: '=',
                // callbackData: '='
                page: '=pageOption'
            },
            controller: FrontPaginationController,
            controllerAs: 'vm',
            bindToController: true,
            link: link
        };
    }

    FrontPaginationController.$inject = ['$scope'];

    function FrontPaginationController($scope) {
        var vm = this;
    }

    function link(scope, element, attrs) {
        console.log(scope)
        scope.vm.page.prve = function () {
            if (scope.vm.page.currentPage > 1) {
                scope.vm.page.currentPage = scope.vm.page.currentPage - 1;
            }
            scope.vm.page.pageChanged(scope.vm.page.currentPage);
        }

        scope.vm.page.next = function () {
            if (scope.vm.page.currentPage < scope.vm.page.pageSize) {
                scope.vm.page.currentPage = scope.vm.page.currentPage + 1;
            }
            scope.vm.page.pageChanged(scope.vm.page.currentPage);
        }

        scope.$watch('vm.page.totalItems', function (newValue, oldValue) {
            //分多少页
            scope.vm.page.pageSize = Math.ceil(scope.vm.page.totalItems / scope.vm.page.currentSize);
            scope.vm.page.pageSizeArray = new Array(scope.vm.page.pageSize);
        })

    }

})();
