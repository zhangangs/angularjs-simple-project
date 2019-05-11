(function () {
    'use strict';

    /**
     * @ footer公用组件，指令
     * */
    var app = angular.module('App');
    app.directive('footer', footer);

    function footer() {
        var directive = {
            restrict: 'E',
            replace: true,	//指令链接模板是否替换原有元素
            templateUrl: 'app/layouts/footer/footer.html',
            controller: FooterController,
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;
    }

    FooterController.$inject = ['$scope', 'toastr'];
    function FooterController($scope, toastr) {
        var vm = this;

        vm.data = {
            mobile:'',      //手机号码
            'service': [
                { name: '生态', url: 'about.ecology' },
                { name: '赞助计划', url: 'about.publicWelfare' },
            ],
            'tools': [
                { name: 'app下载', url: 'about.download'},
                { name: 'API文档', url: 'about.api'},
                { name: '费率', url: '' }
            ],
            'about': [
                { name: '加入我们', url: 'about.jobs'},
                { name: '社群服务', url: 'about.community'},
                { name: '用户协议', url: 'about.agreement'}
            ],
            'clause': [
                { name: '风险披露说明', url: 'about.risk'},
                { name: '反洗钱策略', url: 'about.antiMoneyLaundering' },
                { name: '隐私条款', url: 'about.privacyPolicy'}
            ]
        }
    }

})();
