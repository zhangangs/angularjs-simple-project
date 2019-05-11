(function () {
    var app = angular.module('App');
    app.run(globalConfig);
    
    // globalConfig.$inject = ['translationHandler', '$rootScope', 'Principal', '$state', 'Popup', 'utils', '$anchorScroll', 'eos'];
    function globalConfig() {
        // function run(translationHandler, $rootScope, Principal, $state, Popup, utils,  $anchorScroll, eos) {
        // translationHandler.initialize();

        //eos初始化
        // eos.initialize();

        /**
         * 路由拦截器，需要登录的router，拦截后跳转到登录页面
         */
        // $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        //   Principal.identity().then(function (account) {
        //     //用户是否登录
        //     var isAuthenticated = Principal.isAuthenticated();
        //     console.log(isAuthenticated)
        //     //前一个页面的参数
        //     var toParam = !_.isEmpty(toParams) ? '?' + utils.urlencoded(toParams) : '';

        //     //跳转地址
        //     var url = toState.name + toParam;

        //     //这些router是不需要登录也可以访问,过滤掉
        //     var router = ['index', 'LoginMain', 'forgetPassword', 'register', 'coin-coin', 'home', 'about', 'dex-market', 'dex-list', 'fund-list', 'fund-track', 'fund-details',
        //       'quick-trade-list', 'coin-trade'
        //     ];

        //     //未登录，跳转到登录页面
        //     if (!isAuthenticated) {
        //       var toStateNameFormat = toState.name.split('.')[0];
        //       if (router.indexOf(toStateNameFormat) == -1) {
        //         //检测用户是否登录，如果没有跳转到登录页面，登录后跳转回来
        //         Popup.alert('用户未登录，请登录访问!', function () {
        //           // Auth.logout();
        //           $state.go('LoginMain', { route_id: url });
        //           //event.preventDefault();
        //         });
        //       }
        //     }

        //     //新页面，滚动条回到头部
        //     $anchorScroll();
        //   })
        // });

    }
})();